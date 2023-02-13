import React from 'react';
import { Header } from '../header/header';
import { ISiteSettings } from '@/shared/types';

interface Props {
  children: JSX.Element | JSX.Element[];
  siteSettings?: ISiteSettings;
}

export const Layout = ({ children, siteSettings }: Props) => {
  return (
    <>
      {siteSettings && <Header navigation={siteSettings.navigation} />}
      <main>{children}</main>
    </>
  );
};
