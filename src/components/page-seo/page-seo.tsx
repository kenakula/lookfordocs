import Head from 'next/head';
import { IPageSettings } from '@/shared/types';
import { getImageUrl } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';

type PageSeoProps = Omit<IPageSettings, 'slug'>;

interface Props {
  pageSettings: PageSeoProps;
  siteUrl: string;
}

export const PageSeo = ({
  pageSettings,
  siteUrl,
}: Props): JSX.Element | null => {
  if (!pageSettings) {
    return null;
  }

  return (
    <Head>
      <title>{pageSettings.pageTitle}</title>
      <meta name="title" content={pageSettings.pageTitle} />
      <meta name="description" content={pageSettings.pageDescription} />
      <meta name="keywords" content={pageSettings.pageKeywords} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={pageSettings.pageTitle} />
      <meta property="og:description" content={pageSettings.pageDescription} />
      <meta
        property="og:image"
        content={getImageUrl(pageSettings.socialImage, ImageSize.Small)}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={pageSettings.pageTitle} />
      <meta
        property="twitter:description"
        content={pageSettings.pageDescription}
      />
      <meta
        property="twitter:image"
        content={getImageUrl(pageSettings.socialImage, ImageSize.Small)}
      />
    </Head>
  );
};
