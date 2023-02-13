import { Box, styled, SxProps } from '@mui/material';
import React from 'react';

type BgColor = 'beje' | 'blue';

const StyledPageSection = styled(Box, {
  shouldForwardProp: prop => prop !== 'bgColor',
})<{ bgColor?: BgColor }>(({ theme, bgColor }) => {
  const color =
    bgColor === 'beje' ? theme.palette.beje.main : theme.palette.misc.main;

  return {
    padding: theme.spacing(8, 0, 5, 0),
    backgroundColor: bgColor ? color : undefined,
  };
});

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
  bgColor?: BgColor;
}

export const PageSection = ({ children, style, bgColor }: Props) => {
  return (
    <StyledPageSection sx={style} component="section" bgColor={bgColor}>
      {children}
    </StyledPageSection>
  );
};
