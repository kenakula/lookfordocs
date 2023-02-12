import { Theme } from '@mui/material';

export const getTypography = (
  theme: Theme,
  fontSize: number,
  lineHeight?: number,
): { fontSize: string; lineHeight: string | undefined } => {
  return {
    fontSize: theme.typography.pxToRem(fontSize),
    lineHeight: lineHeight ? theme.typography.pxToRem(lineHeight) : undefined,
  };
};
