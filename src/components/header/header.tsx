import { List, ListItem, ListItemButton, Slide, Toolbar } from '@mui/material';
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

interface Props {
  siteSettings: ISiteSettings;
}

export const Header = ({
  siteSettings: { navigation, logo, socials },
}: Props): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const position = useScroll(200);
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const trigger = useScrollTrigger();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPageScrolled(position.position.y > 0);
  }, [position.position]);

  const openSmartSearchBox = (): void => {
    dispatch(openSmartSearch());
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
        <StyledHeader
          isScrolled={pageScrolled}
          style={{ visibility: 'visible' }}
        >
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
              {/* TODO not on main page */}
              <StyledSearchButton onClick={openSmartSearchBox}>
                <IconSearch />
              </StyledSearchButton>
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
      />
      <HiddenToolbar />
    </>
  );
};
