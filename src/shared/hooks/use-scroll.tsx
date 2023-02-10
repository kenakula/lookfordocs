import { useRef, useEffect, useState } from 'react';
import { ScrollPosition } from '../types';

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = (): ScrollPosition => {
  if (!isBrowser) return { x: 0, y: 0 };

  return { x: window.scrollX, y: window.scrollY };
};

export function useScroll(wait: number): { position: ScrollPosition } {
  const [position, setPosition] = useState<ScrollPosition>(getScrollPosition());
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const callBack = () => {
    const currPos = getScrollPosition();
    setPosition(currPos);
    throttleTimeout.current = null;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(callBack, wait);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [wait]);

  return { position };
}
