import { Alert, Snackbar, styled } from '@mui/material';
import React from 'react';
import { useToasterPosition, useToasterMessage } from './hooks';

const HIDE_TOASTER_TIME = 6000;

const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    right: theme.spacing(3),
  },

  [theme.breakpoints.up('lmd')]: {
    right: 'auto',
    maxWidth: 400,

    '.MuiPaper-root': {
      width: '100%',
      maxWidth: 'none',
    },
  },
}));

export const Toaster = (): JSX.Element => {
  const origin = useToasterPosition();
  const { open, setOpen, messageInfo, setMessageInfo } = useToasterMessage();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string,
  ): void => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExited = (): void => {
    setMessageInfo(undefined);
  };

  return (
    <StyledSnackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={HIDE_TOASTER_TIME}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo ? messageInfo.message : undefined}
      anchorOrigin={origin}
    >
      <Alert
        onClose={handleClose}
        severity={messageInfo?.severety}
        variant="filled"
      >
        {messageInfo?.message}
      </Alert>
    </StyledSnackbar>
  );
};
