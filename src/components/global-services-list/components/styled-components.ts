import { styled } from '@mui/material';

export const StyledGlobalServices = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),

  ul: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: theme.spacing(0.75),
    rowGap: theme.spacing(0.75),
  },

  li: {
    display: 'flex',
    flexShrink: 0,
    width: 28,
    height: 28,
    borderRadius: '50%',
    backgroundColor: theme.palette.misc.main,
    cursor: 'pointer',

    span: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    svg: {
      fill: 'transparent',
      width: 14,
      height: 14,
      pointerEvents: 'none',
    },
  },
}));
