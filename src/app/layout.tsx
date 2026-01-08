import type { Metadata } from "next";
import { Space_Mono, Orbitron } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlymHack 2026 - Enter the Unknown",
  description: "A journey into the depths of creation. 24 hours. Infinite possibilities.",
};

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-orbitron",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${orbitron.variable} antialiased select-none bg-[#050508] text-gray-100 overflow-x-hidden`}
      >
        {/* Mysterious background effect */}
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-black to-cyan-950/20 pointer-events-none" />
        <div className="fixed inset-0 exploration-grid pointer-events-none opacity-30" />

        {/* Floating orbs for mysterious atmosphere */}
        <div className="fixed top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="fixed bottom-20 right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
