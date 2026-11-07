import type { Metadata } from 'next';
import './globals.css';
import GoogleAnalytics from './google-analytics';

export const metadata: Metadata = {
  title: 'Sérgio Vinícius | Engineer · Builder · Berlin',
  description: 'Personal portfolio of Sérgio Vinícius, a software engineer and product-minded builder based in Berlin.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<GoogleAnalytics /></body></html>;
}
