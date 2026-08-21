'use client';

// Thin client wrapper so app/datenschutz/page.js itself can stay a Server
// Component and export `metadata` (Next.js forbids exporting metadata from
// a 'use client' file, but the language switcher needs client state).
import LegalPageShell, { useLegalLang } from './LegalPageShell';
import DatenschutzContent from './DatenschutzContent';
import { legalI18n } from '../../content/legal/legalI18n';

export default function DatenschutzPage() {
  const [lang, setLang] = useLegalLang();
  return (
    <LegalPageShell lang={lang} setLang={setLang} labels={legalI18n.shared}>
      <DatenschutzContent lang={lang} />
    </LegalPageShell>
  );
}
