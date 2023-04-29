import { GetServerSideProps } from 'next';
import * as fs from 'fs';
import { getClinicsIds, getDoctorsIds } from '@/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL;
type SitemapFeq = 'daily' | 'weekly' | 'monthly';
type SitemapSlug = 'doctors' | 'clinics';

const getStaticSitePaths = (): string[] =>
  fs
    .readdirSync('src/pages')
    .filter(staticPage => {
      return ![
        'api',
        '_app.tsx',
        '_document.tsx',
        '404.tsx',
        '500.tsx',
        'sitemap.xml.tsx',
      ].includes(staticPage);
    })
    .map(staticPagePath => {
      let pageName = staticPagePath.split('.')[0];

      if (pageName === 'index') {
        pageName = '';
      }

      return `${BASE_URL}/${pageName}`;
    });

const getDynamicPaths = (ids: number[], slug: SitemapSlug) =>
  ids.map(id => `${BASE_URL}/${slug}/${id}`);

const getSitemapUrl = (
  url: string,
  freq: SitemapFeq = 'weekly',
  priority = '0.7',
): string => `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;

const generateUrlSet = (
  set: string[],
  priority?: string,
  freq?: SitemapFeq,
): string => set.map(url => getSitemapUrl(url, freq, priority)).join('');

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPaths = getStaticSitePaths();
  const staticUrlSet = generateUrlSet(staticPaths, '1.0');

  const doctorsResponse = await getDoctorsIds();
  const docIds = doctorsResponse.map(value => value.id);
  const doctorsPaths = getDynamicPaths(docIds, 'doctors');
  const doctorsUrlSet = generateUrlSet(doctorsPaths, undefined, 'daily');

  const clinicsResponse = await getClinicsIds();
  const clinicsIds = clinicsResponse.map(value => value.id);
  const clinicsPaths = getDynamicPaths(clinicsIds, 'clinics');
  const clinicsUrlSet = generateUrlSet(clinicsPaths, undefined, 'daily');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrlSet}
      ${doctorsUrlSet}
      ${clinicsUrlSet}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
