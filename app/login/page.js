import LoginForm from '../../components/auth/LoginForm';

export const metadata = {
  title: 'Log in | Langsi',
  description: 'Log in to your Langsi account.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/login/' },
};

export default function Page() {
  return <LoginForm />;
}
