import { Skeleton } from '@mui/material';
import { StyledFilterSkeleton } from './components';

export const FilterResultSkeleton = (): JSX.Element => (
  <StyledFilterSkeleton>
    <Skeleton height={200} />
    <Skeleton height={200} />
    <Skeleton height={200} />
  </StyledFilterSkeleton>
);
