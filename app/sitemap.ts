import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartautouae.com'

  const routes = [
    '',
    '/about',
    '/gallery',
    '/faq',
    '/contact',
    '/services/car-detailing',
    '/services/window-tinting',
    '/services/ceramic-coating',
    '/services/ppf',
    '/services/car-wrapping',
    '/services/interior-detailing',
    '/services/upholstery',
    '/services/marine-tinting',
    '/services/commercial-tinting',
    '/services/home-glass-tinting',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.8 : 0.6,
  }))
}