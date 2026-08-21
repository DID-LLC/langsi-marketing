// lib/blogRouting.mjs
//
// Shared between app/blog/[source]/[target]/[topic]/[slug]/page.js (the
// actual route) and scripts/generate-sitemap.mjs, so the sitemap can never
// list a blog URL the route itself wouldn't resolve.
//
// `topic_segment` can be an empty string in real BlogPost data, and an
// empty URL segment breaks Next's static export (see page.js for the
// original diagnosis). Falls back to 'allgemein'.
export function topicUrlSegment(post) {
  return post.topic_segment || 'allgemein';
}
