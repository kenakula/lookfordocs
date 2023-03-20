import { Box, Skeleton } from '@mui/material';
import { StyledDetailedDoctorSkeleton } from './components';

export const DetailedDoctorSkeleton = (): JSX.Element => {
  return (
    <StyledDetailedDoctorSkeleton>
      <Skeleton variant="text" />
      <Box className="doctor-card-skeleton">
        <Skeleton height={164} className="user-image-skeleton" />
        <Skeleton height={164} className="user-info-skeleton" />
      </Box>
      <Skeleton height={300} className="description-skeleton" />
    </StyledDetailedDoctorSkeleton>
  );
};
