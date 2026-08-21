import LangsiLogo from '../icons/LangsiLogo';

// Same visual design as app.langsi.app's AuthLayout.jsx (dark theme, LANGSI
// sparkle+checkmark lockup, green glow border) — this repo has no shadcn/
// CSS-variable token system, so colors are inlined directly rather than
// scoped through custom properties like the app repo does.
export default function AuthShell({ title, subtitle, footer, children }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{ background: '#070a08', color: '#fafafa' }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'rgba(74,222,128,0.2)' }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl"
          style={{ background: 'rgba(74,222,128,0.15)' }}
        />
        {[
          'absolute -top-10 -left-10 w-40 h-px rotate-45',
          'absolute -top-10 -right-10 w-40 h-px -rotate-45',
          'absolute -bottom-10 -left-10 w-40 h-px -rotate-45',
          'absolute -bottom-10 -right-10 w-40 h-px rotate-45',
        ].map((cls) => (
          <div
            key={cls}
            className={cls}
            style={{ background: 'linear-gradient(to right, transparent, rgba(74,222,128,0.5), transparent)' }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center">
        <div
          className="w-full rounded-[2rem] px-6 py-10 sm:px-10"
          style={{
            border: '1px solid rgba(74,222,128,0.3)',
            background: '#050505',
            boxShadow: '0 0 60px -15px rgba(74,222,128,0.35)',
          }}
        >
          <div className="flex flex-col items-center text-center mb-8">
            <LangsiLogo className="h-20 w-auto mb-2" />
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: 'Poppins' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {subtitle}
              </p>
            )}
          </div>

          {children}

          {footer && (
            <p className="text-center text-sm mt-6" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {footer}
            </p>
          )}
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs mt-6"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          <a href="/datenschutz/" className="hover:text-white transition-colors">Datenschutz</a>
          <span>·</span>
          <a href="/agb/" className="hover:text-white transition-colors">AGB</a>
          <span>·</span>
          <a href="/impressum/" className="hover:text-white transition-colors">Impressum</a>
        </div>
      </div>
    </div>
  );
}
