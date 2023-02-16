import {
  List,
  ListItem,
  ListItemButton,
  Slide,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconMenu, IconSearch } from '../icons';
import {
  DrawerComponent,
  HiddenToolbar,
  StyledHeader,
  StyledNav,
  StyledSearchButton,
  StyledToggler,
} from './components';
import { ContainerComponent } from '@/components';
import { getImageUrl, HOME_PAGE } from '@/shared/assets';
import { useScroll } from '@/shared/hooks';
import { ISiteSettings } from '@/shared/types';
import { openSmartSearch, useAppDispatch } from '@/stores';
import { useCustomTheme } from '@/stores/theme-store-provider';

interface Props {
  siteSettings: ISiteSettings;
  isMainPage: boolean;
}

export const Header = ({
  siteSettings: { navigation, logo, socials, copyrights },
  isMainPage,
}: Props): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const position = useScroll(200);
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const trigger = useScrollTrigger();
  const { theme } = useCustomTheme();
  const isNotMobile = useMediaQuery(theme?.breakpoints.up('lmd') ?? '');
  const dispatch = useAppDispatch();
  const showSearchButton =
    !isMainPage || (isMainPage && !trigger && pageScrolled);

  useEffect(() => {
    setPageScrolled(position.position.y > 0);
  }, [position.position]);

  const openSmartSearchBox = (): void => {
    dispatch(openSmartSearch());

    if (isNotMobile) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openDrawer = (): void => {
    setMobileOpen(true);
  };

  const closeDrawer = (): void => {
    setMobileOpen(false);
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <StyledHeader isScrolled={pageScrolled}>
          <ContainerComponent>
            <Toolbar>
              <Link href={HOME_PAGE} className="logo">
                <Image
                  src={getImageUrl(logo.id, 'logo')}
                  width="115"
                  height="33"
                  alt="логотип сайта"
                />
              </Link>
              <StyledNav component="nav">
                <List>
                  {navigation.map(({ name, url, isAccent }) =>
                    isAccent ? (
                      <ListItem key={name}>
                        <ListItemButton
                          disableRipple
                          disableTouchRipple
                          component={Link}
                          href={url}
                        >
                          {name}
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      <ListItem key={name}>
                        <Link className="nav-link" href={url}>
                          {name}
                        </Link>
                      </ListItem>
                    ),
                  )}
                </List>
              </StyledNav>
              {showSearchButton && (
                <StyledSearchButton onClick={openSmartSearchBox}>
                  <IconSearch />
                </StyledSearchButton>
              )}
              <StyledToggler
                color="inherit"
                aria-label="Открыть меню"
                edge="end"
                onClick={openDrawer}
              >
                <IconMenu />
              </StyledToggler>
            </Toolbar>
          </ContainerComponent>
        </StyledHeader>
      </Slide>
      <DrawerComponent
        navigation={navigation}
        openState={mobileOpen}
        closeDrawer={closeDrawer}
        socials={socials}
        copyrights={copyrights}
        logo={logo}
      />
      <HiddenToolbar />
    </>
  );
};
