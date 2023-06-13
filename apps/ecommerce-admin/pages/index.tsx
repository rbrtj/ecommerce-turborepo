import { useSession } from 'next-auth/react';
import { Layout } from '../components/Layout';

export default function Home() {
  const session = useSession();
  return (
    <Layout>
      <div className="text-neutral-900">Hello, {session.data.user.name}</div>
    </Layout>
  );
}
