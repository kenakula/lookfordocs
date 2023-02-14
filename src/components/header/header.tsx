import {
  List,
  ListItem,
  ListItemButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
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
import { HOME_PAGE } from '@/shared/assets';
import { useScroll } from '@/shared/hooks';
import { INavigation } from '@/shared/types';

interface Props {
  navigation: INavigation[];
}

export const Header = ({ navigation }: Props): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const position = useScroll(200);
  const [pageScrolled, setPageScrolled] = useState<boolean>(false);
  const trigger = useScrollTrigger();

  useEffect(() => {
    setPageScrolled(position.position.y > 0);
  }, [position.position]);

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
                <Typography variant="h5" component="span">
                  LogoLogo
                </Typography>
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
              <StyledSearchButton>
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
      />
      <HiddenToolbar />
    </>
  );
};
