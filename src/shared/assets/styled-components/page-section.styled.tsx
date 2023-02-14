import { Box, styled, SxProps } from '@mui/material';
import React from 'react';

type BgColor = 'beje' | 'blue';

const StyledPageSection = styled(Box, {
  shouldForwardProp: prop =>
    !['bgColor', 'shortBottom'].includes(prop.toString()),
})<{ bgColor?: BgColor; shortBottom?: boolean }>(
  ({ theme, bgColor, shortBottom }) => {
    const color =
      bgColor === 'beje' ? theme.palette.alt.beje : theme.palette.alt.lightBlue;

    return {
      padding: theme.spacing(8, 0, 5),
      backgroundColor: bgColor ? color : undefined,

      [theme.breakpoints.up('lg')]: {
        padding: theme.spacing(12.5, 0, shortBottom ? 6 : 12.5),
      },
    };
  },
);

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
  bgColor?: BgColor;
  shortBottom?: boolean;
}

export const PageSection = ({
  children,
  style,
  bgColor,
  shortBottom,
}: Props) => {
  return (
    <StyledPageSection
      sx={style}
      component="section"
      bgColor={bgColor}
      shortBottom={shortBottom}
    >
      {children}
    </StyledPageSection>
  );
};
