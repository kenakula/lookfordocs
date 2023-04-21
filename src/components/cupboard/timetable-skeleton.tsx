import { Skeleton } from '@mui/material';
import { StyledTimetableSkeleton } from './components';

export const TimetableSkeleton = (): JSX.Element => (
  <StyledTimetableSkeleton>
    <Skeleton height={200} />
  </StyledTimetableSkeleton>
);
