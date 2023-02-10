import React from 'react';
import { Header } from '../header/header';
import { Toaster } from '../toaster/toaster';
import { useScroll } from '@/shared/hooks';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  const { position } = useScroll(200);

  return (
    <>
      <Header position={position} />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
