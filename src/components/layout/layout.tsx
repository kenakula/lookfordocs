import React from 'react';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { ISiteSettings } from '@/shared/types';

interface Props {
  children: JSX.Element | JSX.Element[];
  siteSettings?: ISiteSettings;
}

export const Layout = ({ children, siteSettings }: Props) => {
  console.log('siteSettings:', siteSettings);
  return (
    <>
      {siteSettings && <Header navigation={siteSettings.navigation} />}
      <main>{children}</main>
      <Footer />
    </>
  );
};
