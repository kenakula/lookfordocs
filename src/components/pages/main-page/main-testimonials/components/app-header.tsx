import { Avatar, Typography } from '@mui/material';

export const AppHeader = (): JSX.Element => {
  // TODO брать имя приложения из цмс
  return (
    <header className="card-header">
      <Avatar className="app-avatar">LD</Avatar>
      <div className="card-info">
        <Typography variant="h3" className="card-title">
          LookForDocs
        </Typography>
      </div>
    </header>
  );
};
