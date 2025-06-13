import fs from 'fs';
import path from 'path';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

function updateSitemap() {
  const today = getCurrentDate();
  const urls = [
    { loc: 'https://rizkifajar.dev', priority: '1.0' },
    { loc: 'https://rizkifajar.dev/#about', priority: '0.9' },
    { loc: 'https://rizkifajar.dev/#experience', priority: '0.9' },
    { loc: 'https://rizkifajar.dev/#skills', priority: '0.8' },
    { loc: 'https://rizkifajar.dev/#projects', priority: '0.8' },
    { loc: 'https://rizkifajar.dev/#contact', priority: '0.7' },
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(SITEMAP_PATH, sitemapContent);
  console.log(`Sitemap updated with lastmod date: ${today}`);
}

updateSitemap();
