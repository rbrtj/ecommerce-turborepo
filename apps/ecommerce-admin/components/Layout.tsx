import { useSession, signIn } from 'next-auth/react';
import Nav from '../components/Nav';
import React from 'react';

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  if (!session) {
    return (
      <>
        <div className="bg-primary w-screen h-screen flex items-center">
          <div className="text-center w-full">
            <button
              onClick={() => signIn('google')}
              className="bg-secondary p-2 px-4 rounded-lg"
            >
              Login with Google
            </button>
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-primary min-h-screen flex">
      <Nav />
      <div className="bg-secondary flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  );
};
