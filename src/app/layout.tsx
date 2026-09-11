import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

import { Toaster } from 'react-hot-toast';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'RentalCar - Find your perfect rental car',
  description: 'Reliable and budget-friendly car rentals for any journey.',
  openGraph: {
    title: 'RentalCar - Find your perfect rental car',
    description: 'Reliable and budget-friendly car rentals for any journey.',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Toaster />
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
