import { useLayoutEffect, useState } from 'react';

export const useScrollToElement = (
  elId: string,
): { scrollToElement: () => void } => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const element = document.getElementById(elId);

    setEl(element);
  }, [elId]);

  const scrollToElement = (): void => {
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return {
    scrollToElement,
  };
};
