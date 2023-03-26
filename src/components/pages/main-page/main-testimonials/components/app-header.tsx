import { Avatar, Typography } from '@mui/material';

export const AppHeader = (): JSX.Element => {
  return (
    <header className="card-header">
      <Avatar className="app-avatar">GD</Avatar>
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          GoodDoc
        </Typography>
      </div>
    </header>
  );
};
