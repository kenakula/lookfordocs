import { useEffect } from 'react';
import { useAppDispatch, setSiteSettings } from '@/stores';
import { ISiteSettings } from '../types';

export const useSaveSiteSettings = (settings: ISiteSettings | null): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (settings) {
      dispatch(setSiteSettings(settings));
    }
  }, [dispatch, settings]);
};
