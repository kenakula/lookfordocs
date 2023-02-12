import { Box, styled } from '@mui/material';

export const StyledInner = styled(Box)(({ theme }) => ({
  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.subtitle': {
    marginBottom: theme.spacing(4),
  },
}));
