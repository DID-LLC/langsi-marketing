'use client';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/13ecfd47d_langsi_logo_leitner1.png';

export default function Header({ content }) {
  return (
    <header style={{ background: '#1a251d', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <nav className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={LOGO_URL} alt="Langsi" className="w-8 h-8 rounded-lg" />
          <span className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>
            Langsi
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#method" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            {content.method_tag}
          </a>
          <a href="#pricing" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            {content.pricing.tag}
          </a>
          <a href="#faq" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            FAQ
          </a>
          <a href="https://app.langsi.app/login" className="text-white/60 hover:text-white text-sm transition-colors">
            {content.nav_login}
          </a>
          <a
            href={content.app_deep_link}
            className="text-sm font-bold rounded-xl px-4 py-2 transition-colors"
            style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins' }}
          >
            {content.nav_cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
