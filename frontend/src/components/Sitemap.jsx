/**
 * Sitemap Component - Generates dynamic sitemap for SEO
 * This should be served as /sitemap.xml
 */
const Sitemap = () => {
  const baseURL = 'https://campus-career.vercel.app';
  
  const routes = [
    { path: '/', priority: 1.0, changefreq: 'daily' },
    { path: '/signup', priority: 0.9, changefreq: 'weekly' },
    { path: '/forgot-password', priority: 0.7, changefreq: 'monthly' },
    { path: '/student', priority: 0.8, changefreq: 'daily' },
    { path: '/company', priority: 0.8, changefreq: 'daily' },
    { path: '/college', priority: 0.8, changefreq: 'daily' },
    { path: '/profile', priority: 0.7, changefreq: 'weekly' },
    { path: '/profile/view', priority: 0.7, changefreq: 'weekly' },
    { path: '/post', priority: 0.8, changefreq: 'daily' },
    { path: '/shortlist', priority: 0.7, changefreq: 'weekly' },
    { path: '/postapprove', priority: 0.7, changefreq: 'weekly' },
    { path: '/NoticePage', priority: 0.7, changefreq: 'daily' },
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(
  (route) => `  <url>
    <loc>${baseURL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
).join('\n')}
</urlset>`;

  return (
    <div>
      <pre>{xmlContent}</pre>
    </div>
  );
};

export default Sitemap;
