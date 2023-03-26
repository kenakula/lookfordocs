import {
  alpha,
  AppBar,
  Box,
  Drawer,
  IconButton,
  styled,
  Toolbar,
} from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledHeader = styled(AppBar, {
  shouldForwardProp: prop =>
    !['isMainPage', 'isScrolled'].includes(prop.toString()),
})<{ isScrolled: boolean; isMainPage: boolean }>(
  ({ theme, isScrolled, isMainPage }) => ({
    zIndex: theme.zIndex.appBar,
    backgroundColor:
      isScrolled || !isMainPage
        ? theme.palette.background.default
        : theme.palette.misc.main,
    transition: theme.transitions.create(['box-shadow', 'background-color']),
    boxShadow: isScrolled ? '0px 4px 16px rgba(7, 20, 48, 0.04)' : 'none',
    visibility: 'visible',
    '.MuiToolbar-root': {
      padding: 0,
    },
    '.logo': {
      marginRight: 'auto',
      transition: theme.transitions.create('opacity'),
    },
    [theme.breakpoints.up('lmd')]: {
      '.logo': {
        '&:hover': {
          opacity: 0.7,
        },

        '&:active': {
          opacity: 0.5,
        },

        '&:focus-visible': {
          outline: 'none',
          opacity: 0.7,
        },
      },
    },
    [theme.breakpoints.up('lg')]: {
      '.MuiToolbar-root': {
        minHeight: '80px',
      },
      '.logo': {
        order: -2,
      },
    },
  }),
);

export const HiddenToolbar = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    '&.MuiToolbar-root': {
      minHeight: '80px',
    },
  },
}));

export const StyledNav = styled(Box, {
  shouldForwardProp: prop => prop !== 'isMainPage',
})<{ isMainPage: boolean }>(({ theme, isMainPage }) => ({
  ...theme.typography,
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
  '.MuiList-root': {
    display: 'flex',
  },
  '.MuiListItem-root': {
    marginRight: theme.spacing(6),
    padding: 0,
    '&:last-child': {
      marginRight: 0,
    },
  },
  '.MuiListItemButton-root': {
    fontWeight: 600,
    fontSize: 16,
    color: theme.palette.text.primary,
    whiteSpace: 'nowrap',
    padding: '7px 20px',
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0px 4px 16px ${alpha(theme.palette.text.primary, 0.04)}`,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    border: isMainPage
      ? '1px solid transparent'
      : `1px solid ${theme.palette.misc.dark}`,
    boxSizing: 'border-box',
    '&:hover': {
      borderColor: theme.palette.misc.dark,
      boxShadow: `0px 8px 16px ${alpha(theme.palette.text.primary, 0.08)}`,
      backgroundColor: theme.palette.background.default,
    },
    '&:active': {
      borderColor: theme.palette.text.disabled,
    },
    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.background.default,
      borderColor: 'transparent',
    },
  },
  '.nav-link': {
    ...getTypography(theme, 16, 20),
    color: theme.palette.text.primary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('color'),

    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.2,
    },

    '&.active': {
      position: 'relative',
      pointerEvents: 'none',

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -3,
        display: 'block',
        width: '100%',
        height: 3,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius / 2,
      },
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: theme.palette.primary.dark,
    },

    '&:focus-visible': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },
}));

export const StyledToggler = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const StyledSearchButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(3),
  marginLeft: 'auto',
  svg: {
    stroke: theme.palette.text.primary,
  },
  [theme.breakpoints.up('lg')]: {
    order: -1,
    marginLeft: 0,
    marginRight: theme.spacing(3),
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '.MuiDrawer-paper': {
    width: '100vw',
    paddingBottom: theme.spacing(2),

    [theme.breakpoints.up('md')]: {
      maxWidth: 360,
    },
  },

  '.MuiContainer-root': {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),

    '.MuiIconButton-root': {
      marginLeft: 'auto',
      marginRight: theme.spacing(-1),
      color: theme.palette.text.primary,

      [theme.breakpoints.up('md')]: {
        marginRight: 0,
      },
    },
  },

  '.MuiListItem-root': {
    marginBottom: theme.spacing(5),

    '&:last-child': {
      marginBottom: 0,
    },
  },

  '.MuiListItemButton-root': {
    justifyContent: 'center',
    minHeight: 48,
    border: `1px solid ${theme.palette.misc.dark}`,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(20),
    fontWeight: 600,
    textTransform: 'none',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
      borderColor: theme.palette.text.disabled,
      backgroundColor: theme.palette.background.default,
    },
  },

  '.nav-link': {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    fontSize: 16,
    transition: theme.transitions.create('color'),

    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.2,
    },

    '&.active': {
      position: 'relative',
      pointerEvents: 'none',

      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: -3,
        display: 'block',
        width: '100%',
        height: 3,
        backgroundColor: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius / 2,
      },
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: theme.palette.primary.dark,
    },

    '&:focus': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },

  '.copyrights': {
    padding: theme.spacing(0, 2),
    alignSelf: 'center',
    color: theme.palette.text.disabled,
  },

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const StyledSocials = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  margin: theme.spacing(4, 0, 'auto', 0),
}));
