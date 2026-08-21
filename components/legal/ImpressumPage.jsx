'use client';

// Thin client wrapper so app/impressum/page.js itself can stay a Server
// Component and export `metadata` (Next.js forbids exporting metadata from
// a 'use client' file, but the language switcher needs client state).
import LegalPageShell, { useLegalLang } from './LegalPageShell';
import ImpressumContent from './ImpressumContent';
import { legalI18n } from '../../content/legal/legalI18n';

export default function ImpressumPage() {
  const [lang, setLang] = useLegalLang();
  return (
    <LegalPageShell lang={lang} setLang={setLang} labels={legalI18n.shared}>
      <ImpressumContent lang={lang} />
    </LegalPageShell>
  );
}
