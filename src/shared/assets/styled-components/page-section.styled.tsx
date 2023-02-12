import { Box, styled, SxProps } from '@mui/material';
import React from 'react';

const StyledPageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0, 5, 0),
}));

interface Props {
  children: JSX.Element | JSX.Element[];
  style?: SxProps;
}

export const PageSection = ({ children, style }: Props) => {
  return (
    <StyledPageSection sx={style} component="section">
      {children}
    </StyledPageSection>
  );
};
