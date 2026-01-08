import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LayananDokumen.com - Pusat Administrasi & Surat Resmi",
  description: "Platform penyusunan dokumen administratif, invoice UMKM, dan legalitas dasar. Gratis, tanpa login, dan format standar Indonesia.",
  keywords: ["buat invoice online", "contoh surat lamaran", "nota toko gratis", "kalkulator kpr", "surat perjanjian", "layanandokumen"],
  authors: [{ name: "LayananDokumen Team" }],
  icons: {
    icon: '/favicon.ico',
  },
  // VERIFIKASI GOOGLE SEARCH CONSOLE
  verification: {
    google: "tayBKyloVxPMxQEdM-zAI_pIqd90go0uw3KIovuWSyM",
  },
  // Tambahan metadataBase untuk handle URL absolut otomatis
  metadataBase: new URL('https://layanandokumen.com'), 
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}