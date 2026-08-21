// scripts/lib/sourceLangs.mjs
//
// Single source of truth for which source languages have a live x->Thai
// pair on this site (11 langs, target always 'th' — this marketing site
// only ships Thai as a target language, unlike the old app repo's generic
// multi-target catalog). Shared between scripts/fetchBuildTimeContent.mjs
// and scripts/generate-sitemap.mjs so the two lists can't drift apart —
// fetchBuildTimeContent already fails the whole build (exit 1) if any of
// these source_lang/target_lang='th' LanguagePair rows is missing or
// inactive, so by the time generate-sitemap runs (after it, in the same
// `prebuild` chain), every one of these has already been verified active.
export const SOURCE_LANGS = ['de', 'en', 'fr', 'it', 'ru', 'zh', 'hi', 'es', 'ur', 'ar', 'ja'];
