export default function FinalCTA({ content }) {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '3rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>{content.hero_headline}</h2>
      <a
        href={content.app_deep_link}
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.75rem',
          borderRadius: 6,
          background: '#1C3A27',
          color: '#fff',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        {content.cta_label}
      </a>
    </section>
  );
}
