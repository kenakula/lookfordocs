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
import {
  openAppointmentDialog,
  openSmartSearch,
  useAppDispatch,
} from '@/stores';
import { ContainerComponent } from '@/components';
import { IconMenu, IconSearch } from '@/components/icons';
import { useScroll } from '@/shared/hooks';
import { ISiteSettings } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import {
  getActiveStateClassName,
  getImageUrl,
  HOME_PAGE,
  pushMainGtmEvent,
  pushSmartSearchGtmEvent,
} from '@/shared/assets';
import {
  DrawerComponent,
  HiddenToolbar,
  StyledHeader,
  StyledNav,
  StyledSearchButton,
  StyledToggler,
} from './components';

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
  const [mobileOpen, setMobileOpen] = useState(false);
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
    pushSmartSearchGtmEvent('openSmartSearchButtonClick');

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

  const openAppointmentForm = () => {
    setMobileOpen(false);
    dispatch(openAppointmentDialog());
    pushMainGtmEvent('mainPageHeaderAppointmentPopupEvent');
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
                  src={getImageUrl(logo)}
                  width="150"
                  height="20"
                  alt="логотип сайта"
                />
              </Link>
              <StyledNav isMainPage={isMainPage}>
                <List>
                  {navigation.map(({ name, url, isAccent }) =>
                    isAccent ? (
                      <ListItem key={name}>
                        <ListItemButton
                          disableRipple
                          disableTouchRipple
                          onClick={openAppointmentForm}
                        >
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
                          href={url}
                        >
                          {name}
                        </Link>
                      </ListItem>
                    ),
                  )}
                </List>
              </StyledNav>
              {showSearchButton && (
                <StyledSearchButton
                  disableFocusRipple
                  disableRipple
                  onClick={openSmartSearchBox}
                >
                  <IconSearch id="header-search-icon" />
                </StyledSearchButton>
              )}
              <StyledToggler
                disableFocusRipple
                disableRipple
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
        openAppointmentForm={openAppointmentForm}
      />
      <HiddenToolbar />
    </>
  );
};
