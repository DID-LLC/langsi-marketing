export default function Footer({ content }) {
  return (
    <footer style={{ background: '#161f19', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-wrap gap-4 items-center justify-between">
        <span className="text-white/40 text-sm">{content.footer_copy}</span>
        <div className="flex items-center gap-5 text-sm">
          <a href="https://app.langsi.app/login" className="text-white/50 hover:text-white transition-colors">
            {content.footer_login}
          </a>
          <a href="https://app.langsi.app/impressum" className="text-white/50 hover:text-white transition-colors">
            Impressum
          </a>
          <a href="https://app.langsi.app/datenschutz" className="text-white/50 hover:text-white transition-colors">
            Datenschutz
          </a>
          <a href="https://app.langsi.app/agb" className="text-white/50 hover:text-white transition-colors">
            AGB
          </a>
        </div>
      </div>
    </footer>
  );
}
