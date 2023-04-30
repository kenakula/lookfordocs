/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/telemed',
      },
      {
        userAgent: '*',
        disallow: '/privacy-policy',
      },
      {
        userAgent: '*',
        disallow: '/cities',
      },
    ],
  },
};

module.exports = config;
