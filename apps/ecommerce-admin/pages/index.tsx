import Image from 'next/image';
import { Inter } from 'next/font/google';
import { Button } from 'ui';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <h1 className="text-4xl text-red-300">Pages dir works</h1>
      <Button />
    </>
  );
}
