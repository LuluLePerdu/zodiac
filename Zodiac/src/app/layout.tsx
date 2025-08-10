import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roue du Zodiaque",
  description: "Une roue interactive des signes du zodiaque avec un style mythologique grec",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={cinzel.className}>
        {children}
      </body>
    </html>
  );
}
