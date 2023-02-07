import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, PaletteMode } from '@mui/material';
import { Rubik } from '@next/font/google';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/assets';

declare module '@mui/material/styles' {
  interface Palette {
    beje: Palette['primary'];
  }
  interface PaletteOptions {
    beje: PaletteOptions['primary'];
  }
}

const rubik = Rubik({ subsets: ['latin'] });

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
        typography: {
          ...rubik.style,
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 360,
            md: 600,
            lg: 1024,
            xl: 1440,
          },
        },
        palette: {
          mode,
          primary: {
            main: '#3FC3D0',
            light: '#B1EBF0',
            dark: '#12A5B3',
            contrastText: '#ffffff',
          },
          text: {
            primary: '#071530',
            secondary: '#848B98',
            disabled: '#B9BFCC',
          },
          secondary: {
            main: '#203E7A',
            light: '#284E99',
            dark: '#172D58',
          },
          background: {
            default: '#ffffff',
          },
          beje: {
            main: '#FCF7F3',
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
