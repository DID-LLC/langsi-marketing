// Link targets stay fixed (app.langsi.app hosts a single set of legal pages,
// not localized per source language) — only the visible label is
// translated, via content.footer_legal_labels (imprint/privacy/terms).
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
          <a href="https://app.langsi.app/impressum" className="text-white/50 hover:text-white transition-colors">
            {L.imprint}
          </a>
          <a href="https://app.langsi.app/datenschutz" className="text-white/50 hover:text-white transition-colors">
            {L.privacy}
          </a>
          <a href="https://app.langsi.app/agb" className="text-white/50 hover:text-white transition-colors">
            {L.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}
