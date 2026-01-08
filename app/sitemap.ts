import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://layanandokumen.com' // Ganti dengan domain Mas nanti

  // Daftar path statis
  const routes = [
    '',
    '/tools/katalog-deskripsi',
    '/legalitas',
    // Tambahkan tools utama Mas di sini agar cepat terindeks Google
    '/tools/finance',
    '/tools/po',
    '/tools/penawaran',
    '/tools/surat-kuasa',
    '/tools/jual-beli-tanah',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}