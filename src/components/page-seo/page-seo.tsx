import Head from 'next/head';
import { IPageSettings } from '@/shared/types';

interface Props {
  pageSettings: IPageSettings | null;
}

export const PageSeo = ({ pageSettings }: Props): JSX.Element | null => {
  if (!pageSettings) {
    return null;
  }

  return (
    <Head>
      <title>{pageSettings.pageTitle}</title>
      <meta name="description" content={pageSettings.pageDescription} />
      <meta name="keywords" content={pageSettings.pageKeywords} />
      <meta property="og:title" content={pageSettings.pageTitle} />
      <meta property="og:description" content={pageSettings.pageDescription} />
      <meta property="twitter:title" content={pageSettings.pageTitle} />
      <meta
        property="twitter:description"
        content={pageSettings.pageDescription}
      />
    </Head>
  );
};
