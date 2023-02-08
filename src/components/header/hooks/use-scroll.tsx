import { useEffect } from 'react';

export const useScroll = () => {
  const onPageScroll = (): void => {
    console.log('scrolled');
  };

  useEffect(() => {
    window.addEventListener('scroll', onPageScroll);

    return window.removeEventListener('scroll', onPageScroll);
  }, []);
};
