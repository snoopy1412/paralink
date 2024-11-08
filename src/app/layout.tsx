import { Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} flex min-h-dvh w-screen flex-col font-sans antialiased`}
      >
        <header className="h-[var(--header-height)]">
          <Header />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="h-[var(--footer-height)]">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
