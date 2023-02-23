import { Container as MuiContainer, styled, SxProps } from '@mui/material';
import React from 'react';

const StyledContainer = styled(MuiContainer)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(0, 2),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 4),
  },
}));

interface Props {
  children: React.ReactNode;
  style?: SxProps;
}

export const ContainerComponent = ({ children, style }: Props) => {
  return (
    <StyledContainer sx={style} maxWidth="lg">
      {children}
    </StyledContainer>
  );
};
