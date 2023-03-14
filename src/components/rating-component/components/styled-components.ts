import { getTypography } from '@/shared/assets';
import { Box, Rating, styled } from '@mui/material';

export const StyledRatingWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(1.5),

  '.rating-number': {
    ...getTypography(theme, 12, 16),
    marginTop: 2,
    color: theme.palette.primary.dark,
    fontWeight: 600,
  },
}));

export const StyledRating = styled(Rating)(({ theme, size }) => {
  let iconSize = 24;
  let iconPadding = 0.5;

  if (size === 'small') {
    iconSize = iconSize / 2;
    iconPadding = 0.333;
  }

  return {
    color: theme.palette.misc.light,
    marginLeft: theme.spacing(-iconPadding),

    '&.Mui-focusVisible .MuiRating-iconActive': {
      outline: `1px solid ${theme.palette.primary.light}`,
    },

    svg: {
      width: iconSize,
      height: iconSize,
    },

    'label, & > span': {
      padding: theme.spacing(0, iconPadding),
    },

    '& .MuiRating-iconFilled': {
      color: theme.palette.primary.dark,
    },

    [theme.breakpoints.up('lmd')]: {
      marginLeft: theme.spacing(size === 'small' ? -iconPadding : -2.1875),

      svg: {
        width: size === 'small' ? 12 : 40,
        height: size === 'small' ? 12 : 40,
      },

      label: {
        padding: theme.spacing(size === 'small' ? iconPadding : 2.1875),
      },
    },
  };
});
