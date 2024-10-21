import type { Metadata } from "next";
import localFont from "next/font/local";

import NavBar from "@/components/nav-bar";
import { cn } from "@/lib/utils";

import "./globals.css";

// const SmileyFont = localFont({
//   src: './fonts/SmileySans-Oblique.ttf.woff2'
// })

const SouceHanSans = localFont({
  src: "./fonts/SourceHanSansHWSC-VF.otf.woff2",
});

export const metadata: Metadata = {
  title: "My App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={cn("h-screen w-screen", SouceHanSans.className)}>
        <NavBar />
        <main className="flex flex-grow flex-col items-center px-2">
          {children}
        </main>
      </body>
    </html>
  );
}
