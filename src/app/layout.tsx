import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppNavbar from "@/components/AppNavbar";
import { INavBarItem } from "@/types/ui";
import AppContainer from '@/components/AppContainer';
import { Raleway } from 'next/font/google';
import AppFooter from "@/components/AppFooter";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-raleway',
});

export const metadata: Metadata = {
  title: 'WildBillie',
  description: 'WildBillie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuItems: INavBarItem[] = [
    { name: 'Running', href: '/', isActive: true, isMenu: true },
    { name: 'Triathlon', href: '/about', isMenu: true },
    { name: 'Marathon', href: '/contact', isMenu: true },
  ];
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${raleway.variable} antialiased light`}
    >
      <body className="font-raleway">
          <AppNavbar menuItems={menuItems} />
          <AppContainer variant="xl">
            {children}
          </AppContainer>
          <AppFooter />
      </body>
    </html>
  );
}
