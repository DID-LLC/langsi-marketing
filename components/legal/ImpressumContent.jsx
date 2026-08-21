'use client';

// Ported 1:1 from the Base44 app's src/pages/Impressum.jsx (read-only
// reference) — same sections, same order, same exact legal wording (via
// content/legal/legalI18n.js, itself an unmodified copy of the app's
// src/lib/legalI18n.js impressum block). No links inside this page need
// redirecting to app.langsi.app — Impressum has none of the
// privacy-settings/delete-account links Datenschutz has.
import React from 'react';
import { legalI18n, t } from '../../content/legal/legalI18n';

export default function ImpressumContent({ lang }) {
  const s = legalI18n.impressum;
  const sh = legalI18n.shared;

  return (
    <>
      <h1 className="text-4xl font-extrabold mb-2" style={{ fontFamily: 'Poppins', color: '#50C878' }}>
        {t(s.title, lang)}
      </h1>
      <p className="text-white/40 text-sm mb-12">{t(s.subtitle, lang)}</p>

      <div className="space-y-10 text-white/80 leading-relaxed">
        {/* Operator */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionOperator, lang)}
          </h2>
          <div className="bg-white/5 border border-[#50C878]/20 rounded-xl p-6 space-y-1">
            <p className="font-semibold text-white">Data Informed Decisions LLC</p>
            <p className="text-white/70">{t(s.representedBy, lang)}</p>
            <div className="mt-3">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-1">{t(s.address, lang)}</p>
              <p>Fort Lauderdale, FL 33309</p>
              <p>United States of America (USA)</p>
            </div>
          </div>
          <p className="text-white/40 text-xs mt-3">{t(s.operatorNote, lang)}</p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionContact, lang)}
          </h2>
          <div className="bg-white/5 rounded-xl p-6 space-y-3">
            <div className="flex gap-3">
              <span className="text-white/50 w-20 shrink-0">{t(sh.email, lang)}:</span>
              <a href="mailto:info@data-informed-decisions.com" className="text-[#50C878] hover:underline">
                info@data-informed-decisions.com
              </a>
            </div>
            <div className="flex gap-3">
              <span className="text-white/50 w-20 shrink-0">{t(sh.phone, lang)}:</span>
              <a href="tel:+13025205834" className="text-[#50C878] hover:underline">
                +1 302 520 5834
              </a>
            </div>
            <div className="flex gap-3">
              <span className="text-white/50 w-20 shrink-0">{t(sh.website, lang)}:</span>
              <a href="https://www.langsi.app" className="text-[#50C878] hover:underline">
                www.langsi.app
              </a>
            </div>
          </div>
        </section>

        {/* Legal info */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionLegal, lang)}
          </h2>
          <div className="bg-white/5 rounded-xl p-6 space-y-4">
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wider mb-1">{t(s.companyType, lang)}</p>
              <p>{t(s.companyTypeValue, lang)}</p>
            </div>
            <div>
              <p className="text-white/50 text-sm uppercase tracking-wider mb-1">{t(s.vatId, lang)}</p>
              <p className="text-white/60 text-sm">
                {t(s.vatIdValue, lang)
                  .split('info@data-informed-decisions.com')
                  .map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <React.Fragment key={i}>
                        {part}
                        <a href="mailto:info@data-informed-decisions.com" className="text-[#50C878] hover:underline">
                          info@data-informed-decisions.com
                        </a>
                      </React.Fragment>
                    ) : (
                      part
                    )
                  )}
              </p>
            </div>
          </div>
        </section>

        {/* Responsible for content */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionResponsible, lang)}
          </h2>
          <div className="bg-white/5 rounded-xl p-6 space-y-1">
            <p>Axel Köcher</p>
            <p className="text-white/60">Data Informed Decisions LLC, Fort Lauderdale, FL 33309, USA</p>
          </div>
        </section>

        {/* Dispute resolution */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionDispute, lang)}
          </h2>
          <p>{t(s.disputeText1, lang)}</p>
          <p className="mt-2">
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#50C878] hover:underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="mt-3">{t(s.disputeText2, lang)}</p>
        </section>

        {/* Disclaimer */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionLiability, lang)}
          </h2>
          <p className="mb-3">
            <strong className="text-white">{lang === 'de' ? 'Haftung für Inhalte:' : 'Content Liability:'}</strong>{' '}
            {t(s.liabilityContent, lang)}
          </p>
          <p>
            <strong className="text-white">{lang === 'de' ? 'Haftung für Links:' : 'Link Liability:'}</strong>{' '}
            {t(s.liabilityLinks, lang)}
          </p>
        </section>

        {/* Copyright */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Poppins' }}>
            {t(s.sectionCopyright, lang)}
          </h2>
          <p>{t(s.copyrightText, lang)}</p>
        </section>
      </div>
    </>
  );
}
