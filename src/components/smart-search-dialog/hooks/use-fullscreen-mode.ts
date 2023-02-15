import { RefObject, useEffect } from 'react';
import { useScrollLock } from '@/shared/hooks';

export const useFullscreenMode = (
  opened: boolean,
  isTablet: boolean,
  fullScreenMode: boolean,
  ref: RefObject<HTMLInputElement>,
): void => {
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    if (opened && !isTablet && ref.current) {
      ref.current.focus();
    }

    if (opened && fullScreenMode) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [opened, isTablet, ref, fullScreenMode, unlockScroll, lockScroll]);
};
