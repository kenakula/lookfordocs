import { RefObject, useEffect } from 'react';
import { useScrollLock } from '@/shared/hooks';

export const useFullscreenMode = (
  opened: boolean,
  isTablet: boolean,
  ref: RefObject<HTMLInputElement>,
): void => {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (opened && !isTablet && ref.current) {
      ref.current.focus();
    }

    if (opened && !isTablet) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [opened, isTablet, ref, unlockScroll, lockScroll]);
};
