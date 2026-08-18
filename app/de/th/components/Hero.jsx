export default function Hero({ content }) {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '4rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2.25rem', lineHeight: 1.2, marginBottom: '1rem' }}>
        {content.hero_headline}
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#444', marginBottom: '2rem' }}>
        {content.hero_subline}
      </p>
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
