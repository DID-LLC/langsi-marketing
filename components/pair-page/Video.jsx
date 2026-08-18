// Mirrors src/components/landing/LandingSourceLanguageVideo.jsx's own rule in
// the app repo: if the source language has no landing_video_url, the
// component renders null — no placeholder text, nothing fabricated. None of
// the 11 pairs currently have a landing_video_url in their content JSON, so
// this renders nothing today; it activates automatically once a pair's
// content gains that field.
export default function Video({ content }) {
  if (!content.landing_video_url) return null;

  return (
    <section className="py-16 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/8">
        <video src={content.landing_video_url} controls className="w-full h-auto" />
      </div>
    </section>
  );
}
