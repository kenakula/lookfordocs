import { useEffect } from 'react';
import { useAppDispatch, setTestimonialsLimit } from '@/stores';
import { ISiteSettings } from '../types';

export const useSaveSiteSettings = (settings: ISiteSettings | null): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (settings) {
      dispatch(setTestimonialsLimit(settings.testimonialsLimit));
    }
  }, [dispatch, settings]);
};
