import React from 'react';
import { Header } from '../header/header';
import { Toaster } from '../toaster/toaster';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Toaster />
    </>
  );
};
