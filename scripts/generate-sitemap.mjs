// scripts/generate-sitemap.mjs
//
// Runs as its own explicit step in .github/workflows/nextjs.yml ("Generate
// sitemap and robots.txt"), AFTER "Fetch build-time content from Base44"
// (scripts/fetchBuildTimeContent.mjs) and BEFORE "Build with Next.js". NOT
// wired through npm's `prebuild` lifecycle hook — the workflow calls
// `node scripts/fetchBuildTimeContent.mjs` and `npx next build` directly as
// separate steps, never `npm run build`/`npm run prebuild`, so a script
// only added to package.json's "prebuild" would silently never run in CI.
// (package.json's "prebuild" chain still calls this too, purely so a local
// `npm run build` behaves the same way — CI does not use it.)
// Writes robots.txt and four sitemap XML files into public/, so Next's
// static export (output: 'export') copies them into out/ verbatim along
// with everything else in public/.
//
// Deliberately does NOT re-fetch LanguagePair from Base44: this site only
// ever ships the 11 SOURCE_LANGS -> 'th' pairs (see scripts/lib/sourceLangs.mjs),
// and fetchBuildTimeContent.mjs already fails the whole build (exit 1) if
// any one of those 11 pairs is missing or inactive. So by the time this
// script runs, every one of the 11 has already been verified active by the
// step that ran immediately before it — a second independent check here
// would just be a redundant API call.
//
// Blog URLs are read from content/blog/posts.json, written by
// fetchBuildTimeContent.mjs's buildBlogPosts() — same file the actual
// /blog/[source]/[target]/[topic]/[slug]/page.js route reads, and the same
// topicUrlSegment() helper (lib/blogRouting.mjs) it uses to build the URL,
// so a sitemap entry can never point at a URL the route itself wouldn't
// resolve.

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { SOURCE_LANGS } from './lib/sourceLangs.mjs';
import { topicUrlSegment } from '../lib/blogRouting.mjs';

const SITE_URL = 'https://langsi.app';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const POSTS_PATH = path.join(process.cwd(), 'content/blog/posts.json');

function today() {
  return new Date().toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function loadPublishedPosts() {
  try {
    const raw = await readFile(POSTS_PATH, 'utf-8');
    const posts = JSON.parse(raw);
    return Array.isArray(posts) ? posts : [];
  } catch {
    // Matches the route's own loadPosts() fallback (local dev without
    // BASE44_API_KEY, or a build that runs before fetchBuildTimeContent) —
    // zero blog URLs rather than a hard failure.
    return [];
  }
}

// en's hub route (app/en/page.js) sets canonical: '/' and is deliberately
// not indexed as its own URL — see HREFLANG_LANGUAGES in app/page.js,
// app/de/page.js et al. Every other SOURCE_LANGS entry has both a hub page
// (/{lang}/) and a pair page (/{lang}/th/).
const HUB_LANGS = SOURCE_LANGS.filter((lang) => lang !== 'en');

// Mirrors the HREFLANG_LANGUAGES object hardcoded identically in
// app/page.js, app/{lang}/page.js for every hub page: en points at '/',
// every other source lang at its own hub page, plus x-default -> '/'.
// Only root and the hub pages carry this block — the /{lang}/th/ pair pages
// (app/{lang}/th/page.js) define no `alternates.languages` metadata at all,
// so they get no hreflang block here either.
function hreflangAlternates() {
  const entries = SOURCE_LANGS.map((lang) => [lang, lang === 'en' ? '/' : `/${lang}/`]);
  entries.push(['x-default', '/']);
  return entries;
}

function urlEntry({ loc, lastmod, changefreq, priority, hreflang }) {
  const hreflangXml = hreflang
    ? hreflang
        .map(
          ([lang, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(lang)}" href="${escapeXml(SITE_URL + href)}" />`,
        )
        .join('\n') + '\n'
    : '';
  return (
    `  <url>\n` +
    `    <loc>${escapeXml(SITE_URL + loc)}</loc>\n` +
    hreflangXml +
    `    <lastmod>${lastmod}</lastmod>\n` +
    `    <changefreq>${changefreq}</changefreq>\n` +
    `    <priority>${priority}</priority>\n` +
    `  </url>`
  );
}

function urlset(entries, { xhtmlNamespace = false } = {}) {
  const ns = xhtmlNamespace
    ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : '';
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${ns}>\n` +
    entries.join('\n') +
    `\n</urlset>\n`
  );
}

function buildPagesSitemap() {
  const build = today();
  // Only the base pages that actually exist as standalone routes outside
  // the root/language-pair system (see app/agb, app/datenschutz,
  // app/impressum) — confirmed against the repo, not assumed. Root ('/')
  // is listed in sitemap-landingpages.xml instead, as tier 1 of the
  // root/lang/pair structure.
  const entries = [
    urlEntry({ loc: '/agb/', lastmod: build, changefreq: 'yearly', priority: '0.3' }),
    urlEntry({ loc: '/datenschutz/', lastmod: build, changefreq: 'yearly', priority: '0.3' }),
    urlEntry({ loc: '/impressum/', lastmod: build, changefreq: 'yearly', priority: '0.3' }),
  ];
  return urlset(entries);
}

function buildLandingpagesSitemap() {
  const build = today();
  const hreflang = hreflangAlternates();
  const entries = [];

  // Tier 1: root, English entry point, self-canonical.
  entries.push(
    urlEntry({ loc: '/', lastmod: build, changefreq: 'weekly', priority: '1.0', hreflang }),
  );

  // Tier 2: per-language hub pages (all SOURCE_LANGS except 'en', which
  // canonicalizes to '/' and isn't listed separately — see HUB_LANGS above).
  for (const lang of HUB_LANGS) {
    entries.push(
      urlEntry({
        loc: `/${lang}/`,
        lastmod: build,
        changefreq: 'weekly',
        priority: '0.8',
        hreflang,
      }),
    );
  }

  // Tier 3: source-lang -> Thai pair pages, all 11 SOURCE_LANGS including
  // 'en' (app/en/th/page.js is a real, distinct, indexable page — unlike
  // app/en/page.js). No hreflang block: the actual pair page routes define
  // none (see app/{lang}/th/page.js), each pair page is a standalone
  // product page, not a translated alternate of the others.
  for (const lang of SOURCE_LANGS) {
    entries.push(
      urlEntry({ loc: `/${lang}/th/`, lastmod: build, changefreq: 'weekly', priority: '0.9' }),
    );
  }

  return urlset(entries, { xhtmlNamespace: true });
}

function buildBlogSitemap(posts) {
  const entries = posts.map((post) => {
    const lastmod = (post.last_modified_date || post.published_date || today()).slice(0, 10);
    const loc = `/blog/${post.source_language}/${post.target_language}/${topicUrlSegment(post)}/${post.slug}/`;
    return urlEntry({ loc, lastmod, changefreq: 'monthly', priority: '0.6' });
  });
  return urlset(entries);
}

function buildSitemapIndex() {
  const build = today();
  const sitemaps = ['sitemap-pages.xml', 'sitemap-landingpages.xml', 'sitemap-blog.xml'];
  const entries = sitemaps
    .map(
      (name) =>
        `  <sitemap>\n    <loc>${escapeXml(`${SITE_URL}/${name}`)}</loc>\n    <lastmod>${build}</lastmod>\n  </sitemap>`,
    )
    .join('\n');
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    entries +
    `\n</sitemapindex>\n`
  );
}

function buildRobotsTxt() {
  // langsi.app only. app.langsi.app (the Base44 app) has its own,
  // deliberately restrictive robots.txt in a separate repo — not
  // referenced or duplicated here.
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

async function main() {
  const posts = await loadPublishedPosts();
  console.log(`generate-sitemap: ${posts.length} published BlogPost(s) found for sitemap-blog.xml`);

  await writeFile(path.join(PUBLIC_DIR, 'sitemap.xml'), buildSitemapIndex(), 'utf-8');
  await writeFile(path.join(PUBLIC_DIR, 'sitemap-pages.xml'), buildPagesSitemap(), 'utf-8');
  await writeFile(path.join(PUBLIC_DIR, 'sitemap-landingpages.xml'), buildLandingpagesSitemap(), 'utf-8');
  await writeFile(path.join(PUBLIC_DIR, 'sitemap-blog.xml'), buildBlogSitemap(posts), 'utf-8');
  await writeFile(path.join(PUBLIC_DIR, 'robots.txt'), buildRobotsTxt(), 'utf-8');

  console.log('generate-sitemap: wrote robots.txt, sitemap.xml, sitemap-pages.xml, sitemap-landingpages.xml, sitemap-blog.xml to public/');
}

main().catch((err) => {
  console.error('generate-sitemap failed:', err.message);
  process.exit(1);
});
