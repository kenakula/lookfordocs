import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeStoreProvider } from '@/stores/theme-store-provider';
import { createEmotionCache } from '@/shared/assets';
import { store } from '@/stores';
import { Toaster } from '@/components';
import '../styles/global.css';
import ErrorBoundary from '@/components/error-boundary/error-boundary';

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
      <CacheProvider value={emotionCache}>
        <Provider store={store}>
          <ThemeStoreProvider>
            <ErrorBoundary>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <GoogleAnalytics trackPageViews />
              <Component {...pageProps} />
              <Toaster />
            </ErrorBoundary>
          </ThemeStoreProvider>
        </Provider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
