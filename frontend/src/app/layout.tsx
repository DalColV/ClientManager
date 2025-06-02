import './globals.css';
import { Providers } from '../app//providers/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Anka Tech Client Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
