import localFont from 'next/font/local';

import './reset.css';
import './globals.css';

const meiryoFont = localFont({ src: './Meiryo.ttf' });

export const metadata = {
  title: 'T&Dフィナンシャル生命',
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={meiryoFont.className}>{children}</body>
    </html>
  );
}
