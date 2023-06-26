import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
