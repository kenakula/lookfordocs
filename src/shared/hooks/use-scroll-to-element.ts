import { useEffect, useState } from 'react';

export const useScrollToElement = (
  elId: string,
): { scrollToElement: () => void } => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.getElementById(elId);

    if (element) {
      setEl(element);
    }
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
