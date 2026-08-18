// scripts/fetchBuildTimeContent.mjs
//
// Runs as the `prebuild` step (see package.json) in the GitHub Actions build,
// before `next build`. Fetches build-time content from the Base44 REST API
// and writes it to content/pairs/{source}-th.json (one per pair in
// PAIRS below) and content/blog/posts.json — all gitignored, generated
// fresh on every build.
//
// Required env var: BASE44_API_KEY (GitHub Actions secret, already configured).
// Exits non-zero on any network/auth/shape error so the build fails loudly
// instead of shipping with empty or stale content.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://langsi-9a154b61.base44.app/api';
const API_KEY = process.env.BASE44_API_KEY;

// One entry per source→th language pair. `languagePairId` is carried along
// for reference/documentation only — the actual fetch below reaches
// Vocabulary and LangsiExplanation directly by `vocabularyId`, it never
// needs to go through LanguagePair.
const PAIRS = [
  { source: 'de', languagePairId: '6908128ab0a782dcbd0f9f95', vocabularyId: '6a33e4928b0dd2b25771fa75' },
  { source: 'en', languagePairId: '69141331dcb0ce7c713d06c3', vocabularyId: '69ae5f1c69c008749f3abde1' },
  { source: 'fr', languagePairId: '69b5bef6ae7df9898af5c277', vocabularyId: '6a29895d1a01941803316a29' },
  { source: 'it', languagePairId: '69568049a9acaa3920ace2d9', vocabularyId: '6a2682ab7c7566b9b0da533c' },
  { source: 'ru', languagePairId: '6a2690ce87eb075776c5d353', vocabularyId: '6a2997ab598da8af8ae4afce' },
  { source: 'zh', languagePairId: '6a26d7bf79119b860dea3d1f', vocabularyId: '6a2c09cd09630ed2473ced44' },
  { source: 'hi', languagePairId: '6a26d782adf1b8ca1bf59f8b', vocabularyId: '6a2bc0537aa4046b778f88f0' },
  { source: 'es', languagePairId: '69b5bf2643a8c420aa652bb3', vocabularyId: '6a4a82172dc19470c3118b76' },
  { source: 'ur', languagePairId: '6a6170f1ae3fbb6ec3f6cf47', vocabularyId: '6a6177a567a16b38bdae01c2' },
  { source: 'ar', languagePairId: '6a47ecea5070364b882a4a45', vocabularyId: '6a553ab23fa38c4b71ff95e6' },
  { source: 'ja', languagePairId: '6a553abd2d264832464c3187', vocabularyId: '6a55d646b0fd0eda8ed3c3e6' },
];

const OUTPUT_BLOG_PATH = path.join(process.cwd(), 'content/blog/posts.json');

if (!API_KEY) {
  console.error('ERROR: BASE44_API_KEY is not set. Aborting build.');
  process.exit(1);
}

async function base44Get(pathAndQuery) {
  const url = `${BASE_URL}${pathAndQuery}`;
  let res;
  try {
    res = await fetch(url, {
      method: 'GET',
      headers: { api_key: API_KEY },
    });
  } catch (err) {
    throw new Error(`Network error fetching ${url}: ${err.message}`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET ${url} failed: ${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

// Picks the sentence text/transliteration/translation for one LangsiExplanation
// record. Each record's explanation_json.explanation.register_analysis holds
// one sentence per register (colloquial/standard/formal) in alternative_variants;
// detected_register_key identifies which one corresponds to the original
// example sentence this explanation was generated for, so that's the variant
// we surface here. Falls back to the first available variant if the detected
// one isn't present in the array for some reason.
function extractSentence(explanation) {
  const analysis = explanation?.explanation_json?.explanation?.register_analysis;
  const variants = analysis?.alternative_variants ?? [];
  const chosen =
    variants.find((v) => v.register_key === analysis?.detected_register_key) ?? variants[0];

  if (!chosen) return null;

  return {
    sentence_variant_key: explanation.sentence_variant_key,
    sentence_th: chosen.sentence,
    transliteration: chosen.transliteration,
    translation_de:
      chosen.natural_translation ??
      explanation.explanation_json?.explanation?.natural_translation ??
      null,
  };
}

// Field names on the returned object (word_th, romanization, translation_de,
// sentence_th, translation_de on each example sentence) are the literal
// demo_vocabulary shape every pair's template expects — fixed across all 11
// pairs by design (not actually German-specific), so every page's Demo
// component can read the same keys regardless of the pair's source language.
async function buildDemoVocabulary(vocabularyId) {
  console.log(`Fetching Vocabulary/${vocabularyId}...`);
  const vocab = await base44Get(`/entities/Vocabulary/${vocabularyId}`);

  console.log(`Fetching LangsiExplanation for vocabulary_id=${vocabularyId}...`);
  const explanations = await base44Get(
    `/entities/LangsiExplanation?q=${encodeURIComponent(
      JSON.stringify({ vocabulary_id: vocabularyId }),
    )}&limit=20`,
  );

  if (!Array.isArray(explanations)) {
    throw new Error(
      `Expected an array from LangsiExplanation filter, got: ${JSON.stringify(explanations)}`,
    );
  }

  console.log(
    `Found ${explanations.length} LangsiExplanation record(s) for vocabulary_id=${vocabularyId} — not assuming a fixed count (0 and 1 must both work).`,
  );

  const example_sentences = explanations
    .slice()
    .sort((a, b) => String(a.sentence_variant_key).localeCompare(String(b.sentence_variant_key)))
    .map(extractSentence)
    .filter(Boolean);

  return {
    word_th: vocab.word,
    romanization: vocab.phonetic_display || vocab.phonetic_romanization || '',
    translation_de: vocab.translation,
    example_sentences,
  };
}

async function buildPairContent(pair) {
  const templatePath = path.join(process.cwd(), `content/pairs/${pair.source}-th.template.json`);
  const outputPath = path.join(process.cwd(), `content/pairs/${pair.source}-th.json`);

  const demo_vocabulary = await buildDemoVocabulary(pair.vocabularyId);

  console.log(`Reading template ${templatePath}...`);
  const templateRaw = await readFile(templatePath, 'utf-8');
  const template = JSON.parse(templateRaw);

  const output = { ...template, demo_vocabulary };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`Wrote ${outputPath}`);
}

async function buildBlogPosts() {
  console.log('Fetching published BlogPost entries...');
  const posts = await base44Get(
    `/entities/BlogPost?q=${encodeURIComponent(JSON.stringify({ status: 'published' }))}&limit=100`,
  );

  if (!Array.isArray(posts)) {
    throw new Error(`Expected an array from BlogPost filter, got: ${JSON.stringify(posts)}`);
  }

  console.log(`Found ${posts.length} published BlogPost(s).`);
  if (posts.length > 0) {
    // Full raw response for the first post, logged once so the fields actually
    // present are visible before anything downstream relies on them.
    console.log('--- Raw first BlogPost (for field inspection) ---');
    console.log(JSON.stringify(posts[0], null, 2));
    console.log('--- end raw first BlogPost ---');
  }

  await mkdir(path.dirname(OUTPUT_BLOG_PATH), { recursive: true });
  await writeFile(OUTPUT_BLOG_PATH, JSON.stringify(posts, null, 2) + '\n', 'utf-8');
  console.log(`Wrote ${OUTPUT_BLOG_PATH}`);
}

async function main() {
  for (const pair of PAIRS) {
    console.log(`\n=== Building content/pairs/${pair.source}-th.json ===`);
    await buildPairContent(pair);
  }
  await buildBlogPosts();
  console.log('fetchBuildTimeContent: done.');
}

main().catch((err) => {
  console.error('fetchBuildTimeContent failed:', err.message);
  process.exit(1);
});
