import { styled, Button, ButtonProps } from '@mui/material';

const StyledButton = styled(Button)(({ theme }) => ({
  minHeight: 48,
  borderColor: theme.palette.misc.light,
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.typography.pxToRem(20),
  fontWeight: 600,
  textTransform: 'none',
  color: theme.palette.text.primary,

  '&:hover': {
    borderColor: theme.palette.text.disabled,
    backgroundColor: theme.palette.background.default,
  },

  '&:focus-visible': {
    outline: `4px solid ${theme.palette.primary.light}`,
    borderColor: theme.palette.background.default,
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: 159,
  },
}));

interface Props extends ButtonProps {
  text: string;
}

export const ButtonComponent = ({ text, ...props }: Props) => {
  return (
    <StyledButton color="secondary" disableRipple disableFocusRipple {...props}>
      {text}
    </StyledButton>
  );
};
