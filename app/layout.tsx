import type { Metadata } from "next";
import { Inter, Bungee_Shade } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const bungee = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HSK Text Analyser",
  description:
    "Simply enter your Chinese (Mandarin) text and get a list of words distributed by HSK level",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
