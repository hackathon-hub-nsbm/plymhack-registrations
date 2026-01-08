import type { Metadata } from "next";
import { ABeeZee } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlymHack 2026",
  description: "24 hours. Teams. Ideas. Build something unforgettable.",
};

const abeezee = ABeeZee({
  subsets: ["latin"],
  weight: ["400"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${abeezee.className} antialiased text-white select-none bg-[url('/background.webp')] bg-cover bg-center bg-no-repeat md:pr-8`}
      >
        {children}
      </body>
    </html>
  );
}
