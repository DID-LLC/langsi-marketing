'use client';

// Thin client wrapper so app/agb/page.js itself can stay a Server Component
// and export `metadata` (Next.js forbids exporting metadata from a
// 'use client' file, but the language switcher needs client state).
import LegalPageShell, { useLegalLang } from './LegalPageShell';
import AGBContent from './AGBContent';
import { legalI18n } from '../../content/legal/legalI18n';

export default function AGBPage() {
  const [lang, setLang] = useLegalLang();
  return (
    <LegalPageShell lang={lang} setLang={setLang} labels={legalI18n.shared}>
      <AGBContent lang={lang} />
    </LegalPageShell>
  );
}
