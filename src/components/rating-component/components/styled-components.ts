import { getTypography } from '@/shared/assets';
import { Box, Rating, styled } from '@mui/material';

export const StyledRatingWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: theme.spacing(1.5),

  '.rating-number': {
    ...getTypography(theme, 14, 20),
    marginTop: 2,
    color: theme.palette.primary.dark,
    fontWeight: 600,

    [theme.breakpoints.up('lmd')]: {
      ...getTypography(theme, 14, 20),
    },
  },
}));

export const StyledRating = styled(Rating)(({ theme, size }) => {
  let iconSize = 24;
  let iconPadding = 0.75;

  if (size === 'small') {
    iconSize = 14;
    iconPadding = 0.333;
  }

  return {
    color: theme.palette.misc.dark,
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
      marginLeft: theme.spacing(size === 'small' ? -iconPadding : -1.25),

      svg: {
        width: size === 'small' ? 14 : 36,
        height: size === 'small' ? 14 : 36,
      },

      label: {
        padding: theme.spacing(0, size === 'small' ? iconPadding : 1.25),
      },

      '&.detailed-location': {
        svg: {
          width: 16,
          height: 16,
        },
      },
    },
  };
});
