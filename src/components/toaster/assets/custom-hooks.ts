import { SnackbarOrigin, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ToasterMessage } from '@/shared/types';
import {
  useAppSelector,
  useAppDispatch,
  removeToasterFromPack,
} from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';

export const useToasterPosition = (): SnackbarOrigin => {
  const [origin, setOrigin] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme ? theme.breakpoints.up('sm') : '');

  useEffect(() => {
    if (matches) {
      setOrigin({ vertical: 'bottom', horizontal: 'left' });
    }
  }, [matches]);

  return origin;
};

interface IToasterHook {
  open: boolean;
  messageInfo: ToasterMessage | undefined;
  setMessageInfo: React.Dispatch<
    React.SetStateAction<ToasterMessage | undefined>
  >;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useToasterMessage = (): IToasterHook => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<ToasterMessage | undefined>(
    undefined,
  );
  const { toasterPack } = useAppSelector(state => state.toaster);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasterPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...toasterPack[0] });
      dispatch(removeToasterFromPack());
      setOpen(true);
    } else if (toasterPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [toasterPack, messageInfo, open, dispatch]);

  return { open, setOpen, messageInfo, setMessageInfo };
};
