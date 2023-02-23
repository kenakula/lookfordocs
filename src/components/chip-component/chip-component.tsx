import { styled } from '@mui/material';
import { IChip } from '@/shared/types';

const StyledChip = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  padding: theme.spacing(1, 1.5),
  color: theme.palette.primary.dark,
  background: theme.palette.misc.main,
  borderRadius: theme.shape.borderRadius,
}));

interface Props {
  data: IChip;
}

export const ChipComponent = ({ data: { text } }: Props): JSX.Element => {
  return <StyledChip>{text}</StyledChip>;
};
