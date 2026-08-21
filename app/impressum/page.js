import ImpressumPage from '../../components/legal/ImpressumPage';

export const metadata = {
  title: 'Impressum | Langsi',
  description: 'Impressum von Langsi: Anbieterkennzeichnung, Kontaktdaten und rechtliche Angaben gemäß § 5 TMG.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <ImpressumPage />;
}
