import { Box, styled } from '@mui/material';

export const StyledFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 2.5),
}));

export const StyledFooterTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  '.MuiTypography-h6': {
    marginBottom: theme.spacing(2),
  },
}));
