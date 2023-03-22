import { styled, Typography } from '@mui/material';
import { IWorkTime } from '@/shared/types';

const StyledWorkTimeWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface Props {
  data: IWorkTime[];
}

export const WorkTime = ({ data }: Props): JSX.Element => {
  return (
    <StyledWorkTimeWrapper>
      <Typography variant="h4">Режим работы:</Typography>
      <dl>
        {data.map(item => (
          <>
            <dd>{item.days}</dd>
            <dt>{item.hours}</dt>
          </>
        ))}
      </dl>
    </StyledWorkTimeWrapper>
  );
};
