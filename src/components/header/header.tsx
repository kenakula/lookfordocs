import {
  List,
  ListItem,
  ListItemButton,
  Slide,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { openSmartSearch, useAppDispatch } from '@/stores';
import { ContainerComponent } from '@/components';
import { IconMenu, IconSearch } from '@/components/icons';
import { useScroll } from '@/shared/hooks';
import { ISiteSettings } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { getImageUrl, HOME_PAGE } from '@/shared/assets';
import {
  DrawerComponent,
  HiddenToolbar,
  StyledHeader,
  StyledNav,
  StyledSearchButton,
  StyledToggler,
} from './components';
import { getActiveStateClassName } from './assets';

interface Props {
  siteSettings: ISiteSettings;
  isMainPage: boolean;
  isDetailedPage: boolean;
}

export const Header = ({
  siteSettings: { navigation, logo, socials, copyrights },
  isMainPage,
  isDetailedPage,
}: Props): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const position = useScroll(200);
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const trigger = useScrollTrigger();
  const isNotMobile = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();
  const showSearchButton = !trigger && pageScrolled && !isDetailedPage;
  const router = useRouter();

  useEffect(() => {
    setPageScrolled(position.position.y > 0);
  }, [position.position]);

  const openSmartSearchBox = (): void => {
    if (isNotMobile) {
      const searchInput = document.getElementById('main-search');

      if (searchInput) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        searchInput.focus({ preventScroll: true });
      }
    } else {
      dispatch(openSmartSearch());
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
        <StyledHeader isScrolled={pageScrolled} isMainPage={isMainPage}>
          <ContainerComponent>
            <Toolbar>
              <Link href={HOME_PAGE} className="logo">
                <Image
                  src={getImageUrl(logo.id, 'logo')}
                  width="113"
                  height="21"
                  alt="логотип сайта"
                />
              </Link>
              <StyledNav component="nav" isMainPage={isMainPage}>
                <List>
                  {navigation.map(({ name, url, isAccent }) =>
                    isAccent ? (
                      <ListItem key={name}>
                        <ListItemButton disableRipple disableTouchRipple>
                          {name}
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      <ListItem key={name}>
                        <Link
                          className={`nav-link ${getActiveStateClassName(
                            url,
                            router.pathname,
                          )}`}
                          href={`/${url}`}
                        >
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
