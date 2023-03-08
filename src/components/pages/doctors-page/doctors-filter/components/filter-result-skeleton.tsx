import { Box, Skeleton, styled } from '@mui/material';

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '100%',
  transform: 'none',

  '& + .MuiSkeleton-root': {
    marginTop: theme.spacing(1),
  },
}));

export const FilterResultSkeleton = (): JSX.Element => (
  <Box sx={{ width: '100%' }}>
    <StyledSkeleton height={200} />
    <StyledSkeleton height={200} />
    <StyledSkeleton height={200} />
  </Box>
);
