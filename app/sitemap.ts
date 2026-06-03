import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://smartautouae.com'

  const routes = [
    '',
    '/about',
    '/faq',
    '/contact-us',
    '/services/car-detailing',
    '/services/window-tinting',
    '/services/nano-ceramic-coating',
    '/services/paint-protection-films',
    '/services/car-wrapping',
    '/services/marine-window-tinting',
    '/services/commercial-window-tinting',
    '/services/residential-window-tinting',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.8 : 0.6,
  }))
}