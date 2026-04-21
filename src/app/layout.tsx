import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "husensan'sPortfolio",
  description: "A storybook portfolio lit by candlelight.",
  icons: {
    icon: "/favicon.png",
  },
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
