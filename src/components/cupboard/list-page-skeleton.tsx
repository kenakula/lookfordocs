import { Skeleton } from '@mui/material';
import { LayoutSkeleton } from './layout-skeleton';

export const ListPageSkeleton = (): JSX.Element => {
  return (
    <LayoutSkeleton>
      <Skeleton height={400} variant="rectangular" sx={{ my: 2 }} />
      <Skeleton height={200} variant="rectangular" sx={{ my: 2 }} />
    </LayoutSkeleton>
  );
};
