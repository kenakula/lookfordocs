import { RefObject, useState, useLayoutEffect } from 'react';

export const useGetCardHeight = (
  ref: RefObject<HTMLDivElement>,
): { height: number } => {
  const [cardHeight, setCardHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      setCardHeight(height);
    }
  }, [ref]);

  return {
    height: cardHeight,
  };
};
