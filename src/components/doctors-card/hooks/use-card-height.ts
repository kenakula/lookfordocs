import { RefObject, useState, useEffect } from 'react';

export const useGetCardHeight = (
  ref: RefObject<HTMLDivElement>,
): { height: number } => {
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      setCardHeight(height);
    }
  }, [ref]);

  return {
    height: cardHeight,
  };
};
