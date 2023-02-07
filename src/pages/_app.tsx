import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { store } from '@/stores';
import { Toaster } from '@/components';
import { ThemeStoreProvider } from '@/stores/theme-store-provider';
import { createEmotionCache } from '@/shared/assets';

const clientSideEmotionCache = createEmotionCache();

interface ProjectApp extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: ProjectApp): JSX.Element {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeStoreProvider>
          <>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
            <Toaster />
          </>
        </ThemeStoreProvider>
      </Provider>
    </CacheProvider>
  );
}
