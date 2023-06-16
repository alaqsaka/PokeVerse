import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PokeVerse",
  description: "PokeVerse - Website for Pokemon Information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <ClientOnly>
        <Navbar />
      </ClientOnly>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
