import { Avatar, Box, Typography } from '@mui/material';

export const AppHeader = (): JSX.Element => {
  return (
    <Box component="header" className="card-header">
      <Avatar className="app-avatar">GD</Avatar>
      <Box className="card-info">
        <Typography variant="h3" className="card-title">
          GoodDoc
        </Typography>
      </Box>
    </Box>
  );
};
