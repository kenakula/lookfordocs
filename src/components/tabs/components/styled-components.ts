import { Tabs, styled } from '@mui/material';

export const StyledTabsList = styled(Tabs)(({ theme }) => ({
  padding: 1,
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,

  '.MuiTabs-indicator': {
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.13)',
    // TODO создать базу с тенями
  },

  '.MuiTab-root': {
    zIndex: 10,
    color: theme.palette.primary.main,
    textTransform: 'capitalize',

    '&.Mui-selected': {
      color: theme.palette.primary.contrastText,
    },
  },
}));
