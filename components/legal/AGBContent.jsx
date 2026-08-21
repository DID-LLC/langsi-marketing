'use client';

// Ported 1:1 from the Base44 app's src/pages/AGB.jsx (read-only reference)
// — same sections in the same order (s1,s2,s3,s4,s5,s7,s8,s9,s12,s16,s17 —
// the gaps at s6/s10/s11/s13/s14/s15 are in the source itself, not an
// extraction error; faithfully reproduced, not renumbered). No links inside
// this page need redirecting to app.langsi.app — AGB has none of the
// privacy-settings/delete-account links Datenschutz has.
import React from 'react';
import { legalI18n, t } from '../../content/legal/legalI18n';

export default function AGBContent({ lang }) {
  const s = legalI18n.agb;
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
          <p>{t(s.s1text, lang)}</p>
          <div className="mt-4 bg-white/5 border border-[#50C878]/20 rounded-xl p-5 space-y-1">
            <p className="font-semibold text-white">{t(s.operator, lang)}</p>
            <p>Data Informed Decisions LLC</p>
            <p>{t(s.representedBy, lang)}</p>
            <p>Fort Lauderdale, FL 33309, USA</p>
            <p>
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
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s2, lang)}
          </h2>
          <p>{t(s.s2intro, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s2items[lang] ?? s.s2items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t(s.s2note, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s3, lang)}
          </h2>
          <p>{t(s.s3text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s4, lang)}
          </h2>
          <p>{t(s.s4intro, lang)}</p>
          <ul className="mt-3 space-y-1 list-disc list-inside">
            {(s.s4items[lang] ?? s.s4items['en']).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-3">{t(s.s4note, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s5, lang)}
          </h2>
          <p>{t(s.s5intro, lang)}</p>
          <div className="mt-4 space-y-4">
            <div className="bg-white/5 rounded-xl p-5">
              <p className="font-semibold text-white">{t(s.s5single, lang)}</p>
              <p className="text-sm mt-2">{t(s.s5singleText, lang)}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-5">
              <p className="font-semibold text-white">{t(s.s5bundle, lang)}</p>
              <p className="text-sm mt-2">{t(s.s5bundleText, lang)}</p>
            </div>
          </div>
          <p className="mt-4 text-white/60 text-sm">{t(s.s5priceNote, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s7, lang)}
          </h2>
          <p>{t(s.s7text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s8, lang)}
          </h2>
          <p>{t(s.s8text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s9, lang)}
          </h2>
          <p>{t(s.s9text, lang)}</p>
          <div className="mt-4 bg-white/5 rounded-xl p-5">
            <p className="font-semibold text-white mb-2">{t(s.s9withdrawalForm, lang)}</p>
            <p className="text-sm text-white/60">{t(s.s9withdrawalText, lang)}</p>
          </div>
          <p className="mt-4">{t(s.s9refund, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s12, lang)}
          </h2>
          <p>{t(s.s12text, lang)}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s16, lang)}
          </h2>
          <p>{t(s.s16text, lang)}</p>
          <p className="mt-3">
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#50C878] hover:underline"
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.s17, lang)}
          </h2>
          <p>{t(s.s17text, lang)}</p>
        </section>
      </div>
    </>
  );
}
