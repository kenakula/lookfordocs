import { Theme } from '@mui/material';

interface IFontParams {
  fontSize: string;
  lineHeight: string | undefined;
}

export const getTypography = (
  theme: Theme,
  fontSize: number,
  lineHeight?: number,
): IFontParams => {
  return {
    fontSize: theme.typography.pxToRem(fontSize),
    lineHeight: lineHeight ? theme.typography.pxToRem(lineHeight) : undefined,
  };
};
