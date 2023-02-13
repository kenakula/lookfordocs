import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeStoreProvider } from '@/stores/theme-store-provider';
import { createEmotionCache } from '@/shared/assets';
import { store } from '@/stores';
import { Toaster } from '@/components';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeStoreProvider>
          <>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <Component {...pageProps} />
            <Toaster />
          </>
        </ThemeStoreProvider>
      </Provider>
    </CacheProvider>
  );
}
