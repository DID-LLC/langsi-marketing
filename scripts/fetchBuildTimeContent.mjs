// scripts/fetchBuildTimeContent.mjs
//
// Runs as the `prebuild` step (see package.json) in the GitHub Actions build,
// before `next build`. Fetches build-time content from the Base44 REST API
// and writes it to content/pairs/de-th.json and content/blog/posts.json —
// both gitignored, generated fresh on every build.
//
// Required env var: BASE44_API_KEY (GitHub Actions secret, already configured).
// Exits non-zero on any network/auth/shape error so the build fails loudly
// instead of shipping with empty or stale content.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://langsi-9a154b61.base44.app/api';
const API_KEY = process.env.BASE44_API_KEY;

const DEMO_VOCABULARY_ID = '6a33e4928b0dd2b25771fa75'; // ตัวอย่าง / Beispiel

const TEMPLATE_PATH = path.join(process.cwd(), 'content/pairs/de-th.template.json');
const OUTPUT_PAIR_PATH = path.join(process.cwd(), 'content/pairs/de-th.json');
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

async function buildDemoVocabulary() {
  console.log(`Fetching Vocabulary/${DEMO_VOCABULARY_ID}...`);
  const vocab = await base44Get(`/entities/Vocabulary/${DEMO_VOCABULARY_ID}`);

  console.log(`Fetching LangsiExplanation for vocabulary_id=${DEMO_VOCABULARY_ID}...`);
  const explanations = await base44Get(
    `/entities/LangsiExplanation?q=${encodeURIComponent(
      JSON.stringify({ vocabulary_id: DEMO_VOCABULARY_ID }),
    )}&limit=20`,
  );

  if (!Array.isArray(explanations)) {
    throw new Error(
      `Expected an array from LangsiExplanation filter, got: ${JSON.stringify(explanations)}`,
    );
  }

  console.log(`Found ${explanations.length} LangsiExplanation record(s) — not assuming a fixed count.`);

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

async function buildPairContent() {
  const demo_vocabulary = await buildDemoVocabulary();

  console.log(`Reading template ${TEMPLATE_PATH}...`);
  const templateRaw = await readFile(TEMPLATE_PATH, 'utf-8');
  const template = JSON.parse(templateRaw);

  const output = { ...template, demo_vocabulary };

  await writeFile(OUTPUT_PAIR_PATH, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`Wrote ${OUTPUT_PAIR_PATH}`);
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

  await writeFile(OUTPUT_BLOG_PATH, JSON.stringify(posts, null, 2) + '\n', 'utf-8');
  console.log(`Wrote ${OUTPUT_BLOG_PATH}`);
}

async function main() {
  await buildPairContent();
  await buildBlogPosts();
  console.log('fetchBuildTimeContent: done.');
}

main().catch((err) => {
  console.error('fetchBuildTimeContent failed:', err.message);
  process.exit(1);
});
