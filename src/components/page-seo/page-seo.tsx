import Head from 'next/head';

interface Props {
  title: string;
  description: string;
  keyWords: string;
}

export const PageSeo = ({
  title,
  description,
  keyWords,
}: Props): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyWords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
};
