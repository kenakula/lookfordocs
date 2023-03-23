import { styled, Typography } from '@mui/material';
import { IWorkTime } from '@/shared/types';
import { getTypography } from '@/shared/assets';

const StyledWorkTimeWrapper = styled('div')(({ theme }) => ({
  color: theme.palette.text.secondary,
  ...getTypography(theme, 12, 16),

  h4: {
    ...getTypography(theme, 12, 16),
    marginBottom: theme.spacing(0.5),
  },

  dl: {
    margin: 0,
  },

  dd: {
    margin: 0,
  },

  '.worktime-item': {
    display: 'flex',
    columnGap: theme.spacing(1),
  },
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
          <div className="worktime-item" key={item.days}>
            <dd>{item.days}</dd>
            <dt>{item.hours}</dt>
          </div>
        ))}
      </dl>
    </StyledWorkTimeWrapper>
  );
};
