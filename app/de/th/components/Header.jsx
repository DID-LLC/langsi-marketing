export default function Header({ content }) {
  return (
    <header style={{ borderBottom: '1px solid #e5e5e5' }}>
      <nav
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>Langsi</span>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="#features">Funktionen</a>
          <a href="#faq">FAQ</a>
          <a href="#pricing">Preise</a>
          <a
            href={content.app_deep_link}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 6,
              background: '#1C3A27',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            {content.cta_label}
          </a>
        </div>
      </nav>
    </header>
  );
}
