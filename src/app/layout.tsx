import type { Metadata } from 'next';

import DynamicHeader from '@/components/header/DynamicHeader';

import './globals.css';
import './reset.css';

export const metadata: Metadata = {
  title: 'TourSNS',
  description: 'TourSNS 투어 소셜 네트워크 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <DynamicHeader isLogin={false} />
        <main>{children}</main>
      </body>
    </html>
  );
}
