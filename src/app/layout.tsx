import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: 'Noesis — Strategic Knowledge Platform',
  description:
    'RAG-powered semantic search, multi-tenant knowledge management, and AI-driven FAQ generation for enterprises and institutions.',
  openGraph: {
    title: 'Noesis — Strategic Knowledge Platform',
    description:
      'RAG-powered semantic search, multi-tenant knowledge management, and AI-driven FAQ generation.',
    type: 'website',
    locale: 'en_GB',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
