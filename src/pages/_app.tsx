import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeStoreProvider } from '@/stores/theme-store-provider';
import { createEmotionCache } from '@/shared/assets';
import { store } from '@/stores';
import { Toaster } from '@/components';
import '../styles/global.css';
import { useState } from 'react';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <Provider store={store}>
            <ThemeStoreProvider>
              <>
                <Head>
                  <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                  />
                  <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                  />
                  <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                  />
                  <link rel="manifest" href="/site.webmanifest" />
                  <link
                    rel="mask-icon"
                    href="/safari-pinned-tab.svg"
                    color="#5bbad5"
                  />
                  <meta name="msapplication-TileColor" content="#da532c" />
                  <meta name="theme-color" content="#ffffff" />
                  {/* og */}
                  <meta property="og:type" content="website" />
                  <meta
                    property="og:url"
                    content="https://goodoc-git-dev-kenakula.vercel.app/"
                  />
                  <meta property="og:image" content="/mstile-150x150.png" />
                  {/* twitter */}
                  <meta property="twitter:card" content="summary_large_image" />
                  <meta
                    property="twitter:url"
                    content="https://goodoc-git-dev-kenakula.vercel.app/"
                  />
                  <meta
                    property="twitter:image"
                    content="/mstile-150x150.png"
                  />
                </Head>
                <Component {...pageProps} />
                <Toaster />
              </>
            </ThemeStoreProvider>
          </Provider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
