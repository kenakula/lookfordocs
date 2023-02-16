import { useEffect } from 'react';
import { closeSmartSearch, useAppDispatch } from '@/stores';

export const useCloseOnMainPageTablet = (isFullScreenMode: boolean): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isFullScreenMode) {
      dispatch(closeSmartSearch({ clear: false }));
    }
  }, [isFullScreenMode, dispatch]);
};
