import { useEffect } from 'react';
import { useAppDispatch, setTestimonialsLimit } from '@/stores';
import { ISiteSettings } from '../types';

export const useSaveSiteSettings = ({
  testimonialsLimit,
}: ISiteSettings): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTestimonialsLimit(testimonialsLimit));
  }, [dispatch, testimonialsLimit]);
};
