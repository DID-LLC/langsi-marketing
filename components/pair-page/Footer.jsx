// Legal pages (impressum/datenschutz/agb) now live on this domain — relative
// links. Login stays on app.langsi.app (unchanged, correct as-is: that's the
// actual app). Visible label stays translated per source language via
// content.footer_legal_labels (imprint/privacy/terms).
export default function Footer({ content }) {
  const L = content.footer_legal_labels;

  return (
    <footer style={{ background: '#161f19', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-wrap gap-4 items-center justify-between">
        <span className="text-white/40 text-sm">{content.footer_copy}</span>
        <div className="flex items-center gap-5 text-sm">
          <a href="https://app.langsi.app/login" className="text-white/50 hover:text-white transition-colors">
            {content.footer_login}
          </a>
          <a href="/impressum/" className="text-white/50 hover:text-white transition-colors">
            {L.imprint}
          </a>
          <a href="/datenschutz/" className="text-white/50 hover:text-white transition-colors">
            {L.privacy}
          </a>
          <a href="/agb/" className="text-white/50 hover:text-white transition-colors">
            {L.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}
