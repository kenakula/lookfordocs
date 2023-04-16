import Head from 'next/head';
import { Favicons, IPageSettings } from '@/shared/types';
import { getImageUrl } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';

type PageSeoProps = Omit<IPageSettings, 'slug'>;

interface Props {
  pageSettings: PageSeoProps;
  favicons: Favicons;
  siteUrl: string;
}

export const PageSeo = ({
  pageSettings,
  favicons,
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

      {favicons && (
        <>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={getImageUrl(favicons.appleTouchIcon)}
          />
          <link
            rel="icon"
            sizes="150x150"
            href={getImageUrl(favicons.png150)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={getImageUrl(favicons.png32)}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={getImageUrl(favicons.png16)}
          />
          <link rel="manifest" href={getImageUrl(favicons.webmanifest)} />
          <link
            rel="mask-icon"
            href={getImageUrl(favicons.safariPinnedTab)}
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </>
      )}

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
