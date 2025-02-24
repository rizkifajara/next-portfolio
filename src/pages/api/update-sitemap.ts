import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');

function getCurrentDate() {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify the authorization token
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const today = getCurrentDate();
    const urls = [
      { loc: 'https://rizkifajar.dev', priority: '1.0' },
      { loc: 'https://rizkifajar.dev/projects', priority: '0.8' },
      { loc: 'https://rizkifajar.dev/about', priority: '0.8' },
      { loc: 'https://rizkifajar.dev/contact', priority: '0.7' },
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
    
    return res.status(200).json({ 
      message: 'Sitemap updated successfully',
      lastmod: today 
    });
  } catch (error) {
    console.error('Error updating sitemap:', error);
    return res.status(500).json({ message: 'Error updating sitemap' });
  }
}
