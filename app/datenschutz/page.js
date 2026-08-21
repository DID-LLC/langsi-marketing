import DatenschutzPage from '../../components/legal/DatenschutzPage';

export const metadata = {
  title: 'Datenschutzerklärung | Langsi',
  description:
    'Datenschutzerklärung von Langsi: welche Daten wir verarbeiten, auf welcher Rechtsgrundlage, und welche Rechte Sie als betroffene Person haben.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <DatenschutzPage />;
}
