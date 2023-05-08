import { styled } from '@mui/material';
import { ChipSize, ChipVariant, IChip } from '@/shared/types';
import { getTypography } from '@/shared/assets';

const StyledChip = styled('span', {
  shouldForwardProp: prop => !['variant', 'size'].includes(prop.toString()),
})<{ variant: ChipVariant; size: ChipSize }>(({ theme, variant, size }) => ({
  ...getTypography(theme, size === 'small' ? 14 : 16, 20),
  display: 'inline-flex',
  padding:
    variant === 'contained' ? theme.spacing(0.75, 1) : theme.spacing(1.25, 2),
  color:
    variant === 'contained'
      ? theme.palette.primary.dark
      : theme.palette.text.primary,
  backgroundColor:
    variant === 'contained' ? theme.palette.misc.main : 'transparent',
  borderRadius: variant === 'contained' ? theme.shape.borderRadius * 2 : 48,
  border:
    variant === 'outlined' ? `1px solid ${theme.palette.misc.dark}` : 'none',

  [theme.breakpoints.up('md')]: {
    ...getTypography(theme, 16, 20),
    padding: theme.spacing(1, 1.5),
  },
}));

interface Props {
  data: IChip;
  itemProp?: string;
}

export const ChipComponent = ({
  data: { text, variant = 'contained', size = 'small' },
  itemProp,
}: Props): JSX.Element => {
  return (
    <StyledChip variant={variant} size={size} itemProp={itemProp}>
      {text}
    </StyledChip>
  );
};
