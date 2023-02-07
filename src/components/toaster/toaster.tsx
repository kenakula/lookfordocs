import { Alert, Snackbar } from '@mui/material';
import React from 'react';
import { useToasterMessage, useToasterPosition } from './assets';

const HIDE_TOASTER_TIME = 6000;

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
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      open={open}
      autoHideDuration={HIDE_TOASTER_TIME}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={messageInfo ? messageInfo.message : undefined}
      anchorOrigin={origin}
    >
      <Alert
        sx={{ width: '100%' }}
        onClose={handleClose}
        severity={messageInfo?.severety}
        variant="filled"
      >
        {messageInfo?.message}
      </Alert>
    </Snackbar>
  );
};
