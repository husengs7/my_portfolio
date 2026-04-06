import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Night in the Park - Candlelight Path",
  description: "A storybook portfolio lit by candlelight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
