import { Box, Skeleton } from '@mui/material';
import { StyledDetailedClinicSkeleton } from './components';

export const DetailedClinicSkeleton = (): JSX.Element => {
  return (
    <StyledDetailedClinicSkeleton>
      <Skeleton variant="text" />
      <Box className="clinic-card-skeleton">
        <Skeleton height={164} className="clinic-image-skeleton" />
        <Skeleton height={164} className="clinic-info-skeleton" />
      </Box>
      <Skeleton height={300} className="description-skeleton" />
    </StyledDetailedClinicSkeleton>
  );
};
