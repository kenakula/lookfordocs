import { useEffect } from 'react';
import { closeSmartSearch, useAppDispatch } from '@/stores';

export const useCloseOnMainPageTablet = (isTablet: boolean): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTablet) {
      dispatch(closeSmartSearch({ clear: false }));
    }
  }, [isTablet, dispatch]);
};
