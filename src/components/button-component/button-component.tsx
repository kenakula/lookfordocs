import { styled, Button, ButtonProps } from '@mui/material';
import { getTypography } from '@/shared/assets';

const StyledButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'shadow',
})<{ shadow?: boolean }>(({ theme, variant, size, shadow }) => ({
  ...getTypography(theme, 16, 20),
  minHeight: size === 'large' ? 56 : 48,
  borderColor: variant === 'outlined' ? theme.palette.misc.dark : 'transparent',
  backgroundColor:
    variant === 'contained' ? theme.palette.secondary.light : 'transparent',
  boxShadow: shadow ? '0px 4px 16px rgba(7, 20, 48, 0.04)' : 'none',
  fontWeight: 600,
  textTransform: 'none',
  color:
    variant === 'contained'
      ? theme.palette.background.default
      : theme.palette.text.primary,

  '&:hover': {
    borderColor:
      variant === 'outlined' ? theme.palette.text.disabled : 'transparent',
    boxShadow: 'none',
    backgroundColor:
      variant === 'outlined' ? 'transparent' : theme.palette.secondary.main,
  },

  '&:focus-visible': {
    outline: `4px solid ${theme.palette.primary.light}`,
    borderColor: theme.palette.background.default,
    boxShadow: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    fontSize:
      size === 'large'
        ? theme.typography.pxToRem(18)
        : theme.typography.pxToRem(16),
    lineHeight:
      size === 'large'
        ? theme.typography.pxToRem(24)
        : theme.typography.pxToRem(20),
    width: 'auto',
    padding: theme.spacing(1, 4),
  },
}));

interface Props extends ButtonProps {
  text: string | JSX.Element;
  shadow?: boolean;
}

export const ButtonComponent = ({ text, shadow, ...props }: Props) => {
  return (
    <StyledButton
      className="btn"
      disableRipple
      disableFocusRipple
      shadow={shadow}
      {...props}
    >
      {text}
    </StyledButton>
  );
};
