// scripts/fetchBuildTimeContent.mjs
//
// Runs as the `prebuild` step (see package.json) in the GitHub Actions build,
// before `next build`. Fetches build-time content from the Base44 REST API
// and writes it to content/pairs/{source}-th.json (one per pair in
// SOURCE_LANGS below) and content/blog/posts.json — all gitignored,
// generated fresh on every build.
//
// Required env var: BASE44_API_KEY (GitHub Actions secret, already configured).
// Exits non-zero on any network/auth/shape error so the build fails loudly
// instead of shipping with empty or stale content.
//
// Per-pair demo data (vocabulary, example sentences, word-for-word analysis)
// is resolved dynamically via LanguagePair -> Vocabulary -> ExampleSentence,
// mirroring the exact resolution the app repo's own
// base44/functions/warmLandingDemoCache/entry.ts (resolveDemoVocabulary) and
// base44/functions/getLandingDemo/entry.ts use — no hardcoded
// language_pair_id/vocabulary_id here, so this stays correct if an admin
// changes landing_demo_override or onboarding_order=1 changes.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://langsi-9a154b61.base44.app/api';
// getLandingDemo is called through the SDK's dedicated function-invocation
// mount (${serverUrl}/functions/{name} — no /api, no /apps/{appId}/ prefix),
// confirmed by reading node_modules/@base44/sdk/dist/modules/functions.js's
// own fetch() method in the app repo AND by curling both candidate URL
// shapes directly (both worked identically; this one matches the SDK's own
// convention, so it's used here). getLandingDemo is PUBLIC/unauthenticated —
// no api_key header on this call, unlike the /api/entities/* calls below.
const FUNCTIONS_BASE_URL = 'https://langsi-9a154b61.base44.app';
const API_KEY = process.env.BASE44_API_KEY;

const SOURCE_LANGS = ['de', 'en', 'fr', 'it', 'ru', 'zh', 'hi', 'es', 'ur', 'ar', 'ja'];

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

async function callGetLandingDemo(languagePairId) {
  const url = `${FUNCTIONS_BASE_URL}/functions/getLandingDemo`;
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language_pair_id: languagePairId }),
    });
  } catch (err) {
    throw new Error(`Network error fetching ${url}: ${err.message}`);
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`POST ${url} failed: ${res.status} ${res.statusText}\n${body}`);
  }
  const json = await res.json();
  return json?.results?.[languagePairId]?.explanation ?? null;
}

async function resolveLanguagePair(sourceLang) {
  const rows = await base44Get(
    `/entities/LanguagePair?q=${encodeURIComponent(
      JSON.stringify({ source_lang: sourceLang, target_lang: 'th', is_active: true }),
    )}`,
  );
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No active LanguagePair found for source_lang=${sourceLang}, target_lang=th`);
  }
  return rows[0];
}

// Mirrors warmLandingDemoCache/entry.ts's resolveDemoVocabulary exactly:
// landing_demo_override.vocabulary_id if set and still valid, else
// onboarding_order=1.
async function resolveVocabulary(pair) {
  const overrideId = pair.landing_demo_override?.vocabulary_id;
  if (overrideId) {
    const overrideRows = await base44Get(
      `/entities/Vocabulary?q=${encodeURIComponent(JSON.stringify({ id: overrideId, language_pair_id: pair.id }))}`,
    );
    if (Array.isArray(overrideRows) && overrideRows[0]) return overrideRows[0];
  }
  const rows = await base44Get(
    `/entities/Vocabulary?q=${encodeURIComponent(JSON.stringify({ language_pair_id: pair.id, onboarding_order: 1 }))}`,
  );
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No demo vocabulary found for language_pair_id=${pair.id}`);
  }
  return rows[0];
}

async function resolveExampleSentences(vocabularyId) {
  const rows = await base44Get(
    `/entities/ExampleSentence?q=${encodeURIComponent(
      JSON.stringify({ vocabulary_id: vocabularyId, is_active: true }),
    )}`,
  );
  if (!Array.isArray(rows)) {
    throw new Error(`Expected an array from ExampleSentence filter, got: ${JSON.stringify(rows)}`);
  }
  return rows.slice().sort((a, b) => a.order_index - b.order_index);
}

// Only the source language's Language row is fetched — the video slot is
// explicitly the source language's own explainer clip (see instructions),
// and nothing in the output consumes a target-language (Thai) Language row,
// so that second fetch the diagnosis considered would just be an unused
// network call.
async function resolveSourceLanguage(sourceLang) {
  const rows = await base44Get(`/entities/Language?q=${encodeURIComponent(JSON.stringify({ code: sourceLang }))}`);
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(`No Language row found for code=${sourceLang}`);
  }
  return rows[0];
}

async function buildPairContent(sourceLang) {
  const templatePath = path.join(process.cwd(), `content/pairs/${sourceLang}-th.template.json`);
  const outputPath = path.join(process.cwd(), `content/pairs/${sourceLang}-th.json`);

  console.log(`[${sourceLang}] Resolving LanguagePair...`);
  const pair = await resolveLanguagePair(sourceLang);

  console.log(`[${sourceLang}] Resolving demo vocabulary...`);
  const vocabulary = await resolveVocabulary(pair);

  console.log(`[${sourceLang}] Fetching example sentences for vocabulary_id=${vocabulary.id}...`);
  const sentences = await resolveExampleSentences(vocabulary.id);
  console.log(`[${sourceLang}] Found ${sentences.length} example sentence(s) — not assuming a fixed count.`);

  console.log(`[${sourceLang}] Fetching source Language row (for landing_video_url)...`);
  const sourceLanguage = await resolveSourceLanguage(sourceLang);

  console.log(`[${sourceLang}] Calling getLandingDemo for language_pair_id=${pair.id}...`);
  const analysis = await callGetLandingDemo(pair.id);

  const demo = {
    vocabulary: {
      word: vocabulary.word,
      translation: vocabulary.translation,
      phonetic_display: vocabulary.phonetic_display || vocabulary.phonetic_romanization || '',
    },
    sentences: sentences.map((s) => ({
      sentence: s.sentence,
      translation: s.translation,
      phonetic_display: s.phonetic_display || '',
      highlight_word: s.highlight_word || '',
      order_index: s.order_index,
    })),
    analysis,
  };

  const video = {
    url: sourceLanguage.landing_video_url || null,
    source_lang_name: sourceLanguage.english_name || sourceLang,
  };

  console.log(`[${sourceLang}] Reading template ${templatePath}...`);
  const templateRaw = await readFile(templatePath, 'utf-8');
  // demo_vocabulary was the old (PROMPT-14/16) build-time-populated field —
  // fully superseded by `demo` here, so it's dropped rather than carried
  // over as dead unused JSON.
  const { demo_vocabulary, ...template } = JSON.parse(templateRaw);

  const output = { ...template, demo, video };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');
  console.log(`[${sourceLang}] Wrote ${outputPath}`);
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
  for (const sourceLang of SOURCE_LANGS) {
    console.log(`\n=== Building content/pairs/${sourceLang}-th.json ===`);
    await buildPairContent(sourceLang);
  }
  await buildBlogPosts();
  console.log('fetchBuildTimeContent: done.');
}

main().catch((err) => {
  console.error('fetchBuildTimeContent failed:', err.message);
  process.exit(1);
});
