import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { GoogleAnalytics, event } from 'nextjs-google-analytics';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeStoreProvider } from '@/stores/theme-store-provider';
import { createEmotionCache } from '@/shared/assets';
import { store } from '@/stores';
import { Toaster } from '@/components';
import '../styles/global.css';

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
            <>
              <Head>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <GoogleAnalytics trackPageViews />
              <Component {...pageProps} />
              <Toaster />
            </>
          </ThemeStoreProvider>
        </Provider>
      </CacheProvider>
    </QueryClientProvider>
  );
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  event(name, {
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  });
}
