import { styled, Button, ButtonProps } from '@mui/material';
import { getTypography } from '@/shared/assets';

const StyledButton = styled(Button, {
  shouldForwardProp: prop =>
    !['shadow', 'primaryColor'].includes(prop.toString()),
})<{ shadow?: boolean; primaryColor?: boolean }>(
  ({ theme, variant, size, shadow, primaryColor }) => {
    let background = 'transparent';
    let hoverBackground = 'transparent';
    let color = theme.palette.background.default;
    let borderColor = 'transparent';

    if (variant === 'outlined') {
      borderColor = theme.palette.misc.dark;
      color = theme.palette.text.primary;
    }

    if (variant === 'contained') {
      background = theme.palette.secondary.light;
      hoverBackground = theme.palette.secondary.main;
      color = theme.palette.background.default;
    }

    if (primaryColor) {
      background = theme.palette.primary.main;
      hoverBackground = theme.palette.primary.dark;
      color = theme.palette.primary.contrastText;
    }

    return {
      ...getTypography(theme, 16, 20),
      minHeight: size === 'large' ? 56 : 48,
      border: '1px solid',
      borderColor,
      backgroundColor: background,
      boxShadow: shadow ? '0px 4px 16px rgba(7, 20, 48, 0.04)' : 'none',
      fontWeight: 600,
      textTransform: 'none',
      color,

      '&:hover': {
        borderColor:
          variant === 'outlined' ? theme.palette.text.disabled : 'transparent',
        boxShadow: 'none',
        backgroundColor: hoverBackground,
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
    };
  },
);

interface Props extends ButtonProps {
  text: string | JSX.Element;
  shadow?: boolean;
  primaryColor?: boolean;
}

export const ButtonComponent = ({
  text,
  shadow,
  primaryColor,
  ...props
}: Props) => {
  return (
    <StyledButton
      className="btn"
      disableRipple
      disableFocusRipple
      shadow={shadow}
      primaryColor={primaryColor}
      {...props}
    >
      {text}
    </StyledButton>
  );
};
