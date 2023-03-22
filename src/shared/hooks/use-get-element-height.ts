import { RefObject, useState, useEffect } from 'react';

export const useGetElementHeight = (
  ref: RefObject<HTMLDivElement>,
): { height: number } => {
  const [elementHeight, setElementHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.getBoundingClientRect().height;
      setElementHeight(height);
    }
  }, [ref]);

  return {
    height: elementHeight,
  };
};
