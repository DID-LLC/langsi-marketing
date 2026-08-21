'use client';

// Ported 1:1 from the Base44 app's src/pages/Datenschutz.jsx (read-only
// reference) — same 19 sections in the same order (s1..s7, s9..s20 — s8
// doesn't exist in the source itself, faithfully reproduced, not
// renumbered). Two real differences, both deliberate:
//   - The two /privacy-settings links (s9 analytics block, s11) and the two
//     /delete-account links (s18 item 3, s20) are now plain absolute <a>
//     tags to https://app.langsi.app/... instead of internal <Link>s — those
//     two pages are dynamic (GA4-consent-revoke function; Base44 function +
//     Turnstile captcha + email-token confirmation) and deliberately were
//     NOT migrated here, so they must keep pointing at the app.
//   - <Link> (react-router-dom) → next/link <Link>, used only for the two
//     genuinely-on-this-site targets nothing else here links to.
import React from 'react';
import { legalI18n, t } from '../../content/legal/legalI18n';
import { DELETE_ACCOUNT_URL } from './LegalPageShell';

const PRIVACY_SETTINGS_URL = 'https://app.langsi.app/privacy-settings';

export default function DatenschutzContent({ lang }) {
  const s = legalI18n.datenschutz;
  const sh = legalI18n.shared;

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2" style={{ fontFamily: 'Poppins', color: '#50C878' }}>
        {t(s.title, lang)}
      </h1>
      <p className="text-white/40 text-sm mb-12">{t(sh.lastUpdated, lang)}</p>

      <div className="space-y-12 text-white/80 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s1, lang)}
          </h2>
          <div className="bg-white/5 border border-[#50C878]/20 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-white">Data Informed Decisions LLC</p>
            <p>{t(s.representedBy, lang)}</p>
            <p>Fort Lauderdale, FL 33309, USA</p>
            <p className="mt-2">
              {t(sh.email, lang)}:{' '}
              <a href="mailto:info@data-informed-decisions.com" className="text-[#50C878] hover:underline">
                info@data-informed-decisions.com
              </a>
            </p>
            <p>
              {t(sh.phone, lang)}:{' '}
              <a href="tel:+13025205834" className="text-[#50C878] hover:underline">
                +1 302 520 5834
              </a>
            </p>
          </div>
          <p className="text-white/40 text-xs mt-3">{t(s.s1note, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s2, lang)}
          </h2>
          <p>{t(s.s2text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s3, lang)}
          </h2>
          <p className="mb-3">{t(s.s3intro, lang)}</p>
          <ul className="space-y-2 list-none">
            {(s.s3items[lang] ?? s.s3items['en']).map(([basis, desc]) => (
              <li key={basis} className="flex gap-3 bg-white/5 rounded-lg px-4 py-3">
                <span className="text-[#50C878] font-mono text-sm whitespace-nowrap">{basis}</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s4, lang)}
          </h2>
          <p>{t(s.s4text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s5, lang)}
          </h2>
          <p>{t(s.s5intro, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s5items[lang] ?? s.s5items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t(s.s5retention, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s6, lang)}
          </h2>
          <p>{t(s.s6intro, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s6items[lang] ?? s.s6items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t(s.s6legal, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s7, lang)}
          </h2>
          <p>{t(s.s7intro, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s7items[lang] ?? s.s7items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t(s.s7legal, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s9, lang)}
          </h2>
          <div className="space-y-3">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="font-semibold text-white">{t(s.s9necessary, lang)}</p>
              <p className="text-sm mt-1">{t(s.s9necessaryText, lang)}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="font-semibold text-white">{t(s.s9localStorage, lang)}</p>
              <p className="text-sm mt-1">{t(s.s9localStorageText, lang)}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="font-semibold text-white">{t(s.s9analytics, lang)}</p>
              <p className="text-sm mt-1">{t(s.s9analyticsText, lang)}</p>
              <p className="text-sm mt-1">
                {t(s.s9revokeLink, lang)}{' '}
                <a href={PRIVACY_SETTINGS_URL} className="text-[#50C878] hover:underline">
                  {t(s.s9revokeSettings, lang)}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s10, lang)}
          </h2>
          <p>{t(s.s10text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s11, lang)}
          </h2>
          <p>{t(s.s11text, lang)}</p>
          <p className="mt-3">
            {t(s.s9revokeLink, lang)}{' '}
            <a href={PRIVACY_SETTINGS_URL} className="text-[#50C878] hover:underline">
              {t(s.s9revokeSettings, lang)}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s12, lang)}
          </h2>
          <p>{t(s.s12text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s13, lang)}
          </h2>
          <p>{t(s.s13text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s14, lang)}
          </h2>
          <p>{t(s.s14text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s15, lang)}
          </h2>
          <p>{t(s.s15text, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s15items[lang] ?? s.s15items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s16, lang)}
          </h2>
          <div className="space-y-3">
            {(s.s16items[lang] ?? s.s16items['en']).map(([cat, dur]) => (
              <div key={cat} className="flex gap-4 bg-white/5 rounded-lg px-4 py-3 flex-wrap">
                <span className="font-semibold text-white whitespace-nowrap min-w-[180px]">{cat}</span>
                <span>{dur}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s17, lang)}
          </h2>
          <p className="mb-3">{t(s.s17intro, lang)}</p>
          <ul className="space-y-2">
            {(s.s17items[lang] ?? s.s17items['en']).map(([art, desc]) => (
              <li key={art} className="flex gap-3 bg-white/5 rounded-lg px-4 py-3">
                <span className="text-[#50C878] font-mono text-sm whitespace-nowrap">{art}</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4">{t(s.s17contact, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s18, lang)}
          </h2>
          <p>{t(s.s18text, lang)}</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {(s.s18items[lang] ?? s.s18items['en']).map((item, i) => {
              if (i === 0) {
                return (
                  <li key={i}>
                    <a href={PRIVACY_SETTINGS_URL} className="text-[#50C878] hover:underline">
                      {t(s.s18privacySettings, lang)}
                    </a>
                  </li>
                );
              }
              if (i === 3) {
                return (
                  <li key={i}>
                    <a href={DELETE_ACCOUNT_URL} className="text-[#50C878] hover:underline">
                      {t(s.s18deleteAccountLink, lang)}
                    </a>
                  </li>
                );
              }
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s19, lang)}
          </h2>
          <p>{t(s.s19text, lang)}</p>
          <p className="mt-3">
            <a
              href="https://www.bfdi.bund.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#50C878] hover:underline"
            >
              www.bfdi.bund.de
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s20, lang)}
          </h2>
          <p>{t(s.s20text, lang)}</p>
          <p className="mt-3">
            <a href={DELETE_ACCOUNT_URL} className="text-[#50C878] hover:underline">
              {t(s.s20deleteRequestLink, lang)}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
