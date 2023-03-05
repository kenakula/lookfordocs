import { styled } from '@mui/material';
import { IChip } from '@/shared/types';
import { getTypography } from '@/shared/assets';

const StyledChip = styled('span')(({ theme }) => ({
  ...getTypography(theme, 14, 20),
  display: 'inline-flex',
  padding: theme.spacing(0.75, 1),
  color: theme.palette.primary.dark,
  background: theme.palette.misc.main,
  borderRadius: theme.shape.borderRadius * 2,

  [theme.breakpoints.up('md')]: {
    ...getTypography(theme, 16, 20),
    padding: theme.spacing(1, 1.5),
  },
}));

interface Props {
  data: IChip;
}

export const ChipComponent = ({ data: { text } }: Props): JSX.Element => {
  return <StyledChip>{text}</StyledChip>;
};
