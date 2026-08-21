import RegisterForm from '../../components/auth/RegisterForm';

export const metadata = {
  title: 'Create account | Langsi',
  description: 'Create your Langsi account and start learning.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/register/' },
};

export default function Page() {
  return <RegisterForm />;
}
