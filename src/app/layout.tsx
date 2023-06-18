import ClientOnly from "./components/ClientOnly";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

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
      <body className={plusJakartaSans.className}>{children}</body>
      <ClientOnly>
        <Footer />
      </ClientOnly>
    </html>
  );
}
