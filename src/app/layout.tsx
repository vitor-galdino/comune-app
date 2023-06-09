import { Krona_One, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});
const kronaOne = Krona_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-krona-one'
});

export const metadata = {
  title: 'Comune App',
  description: 'O Comune é a solução perfeita para gerenciar seus contatos com facilidade.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} ${kronaOne.variable} antialiased font-poppins`}>{children}</body>
    </html>
  );
}
