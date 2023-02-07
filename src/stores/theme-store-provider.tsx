import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/assets';

type ContextProps = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  theme: Theme;
};

interface Props {
  children: JSX.Element;
}

export const ThemeStoreContext = createContext<Partial<ContextProps>>({});
export function useCustomTheme(): Partial<ContextProps> {
  return useContext(ThemeStoreContext);
}

export const ThemeStoreProvider = ({ children }: Props): JSX.Element => {
  const [mode, setMode] = useState<PaletteMode>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem(
      LOCAL_STORAGE_THEME_KEY,
    ) as PaletteMode;

    if (storedTheme) {
      setMode(storedTheme);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        // typography: {
        //   fontFamily: 'Comfortaa',
        // },
        // components: {
        //   MuiCssBaseline: {
        //     styleOverrides: `
        //       @font-face {
        //         font-family: 'Comfortaa';
        //         font-style: normal;
        //         font-weight: 700;
        //         font-display: swap;
        //         src: local('Comfortaa'), url(${Comfortaa}) format('woff2');
        //       }
        //     `,
        //   },
        // },
        // breakpoints: {
        //   values: {
        //     mobile: 0,
        //     tablet: 768,
        //     laptop: 1024,
        //     desktop: 1200,
        //   },
        // },
        palette: {
          mode,
          primary: {
            main: '#399fae',
          },
          warning: {
            main: '#ecca75',
          },
          error: {
            main: '#f05454',
          },
          background: {
            default: mode === 'light' ? '#fafafa' : '#222831',
            paper: mode === 'light' ? '#ffffff' : '#2c3440',
          },
          text: {
            primary: mode === 'light' ? '#282846' : '#F9F9F9',
          },
        },
      }),
    [mode],
  );

  const toggleColorMode = (): void => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newMode);

      return newMode;
    });
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
      theme,
    }),
    [mode, theme],
  );

  return (
    <ThemeStoreContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeStoreContext.Provider>
  );
};
