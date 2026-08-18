export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e5e5', marginTop: '2rem' }}>
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
          padding: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'space-between',
          color: '#666',
          fontSize: '0.9rem',
        }}
      >
        <span>© 2026 Langsi</span>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://app.langsi.app/impressum">Impressum</a>
          <a href="https://app.langsi.app/datenschutz">Datenschutz</a>
          <a href="https://app.langsi.app/agb">AGB</a>
        </div>
      </div>
    </footer>
  );
}
