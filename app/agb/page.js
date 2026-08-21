import AGBPage from '../../components/legal/AGBPage';

export const metadata = {
  title: 'AGB | Langsi',
  description: 'Allgemeine Geschäftsbedingungen (AGB) von Langsi: Leistungsbeschreibung, Preise, Kündigung, Widerrufsrecht und Haftung.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <AGBPage />;
}
