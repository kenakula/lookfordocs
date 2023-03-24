import { getTypography } from '@/shared/assets';
import { styled } from '@mui/material';

export const StyledTestimonialList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  margin: 0,
  padding: 0,
}));

export const StyledTestimonial = styled('li')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.misc.light}`,

  '&:last-child': {
    borderBottom: 'none',
  },

  '.testimonial-card-header': {
    display: 'flex',
    marginBottom: theme.spacing(2),

    '& > span': {
      ...getTypography(theme, 16, 20),
      marginRight: 'auto',
      paddingRight: theme.spacing(2),
    },
  },

  '.testimonial-card-body': {
    marginBottom: theme.spacing(2),

    span: {
      ...getTypography(theme, 14, 20),
      display: 'inline-flex',
      marginBottom: theme.spacing(0.75),
      color: theme.palette.text.disabled,
    },
  },

  '.testimonial-card-footer': {
    time: {
      ...getTypography(theme, 12, 16),
      color: theme.palette.text.disabled,
    },
  },
}));
