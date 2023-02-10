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
import React from 'react';
import { IconMenu, IconSearch } from '../icons';
import { Container } from '../container/container';
import { navItems } from './assets';
import {
  DrawerComponent,
  HiddenToolbar,
  StyledHeader,
  StyledNav,
  StyledSearchButton,
  StyledToggler,
} from './components';

import { HOME_PAGE } from '@/shared/assets';
import { ScrollPosition } from '@/shared/types';

interface Props {
  position: ScrollPosition;
}

export const Header = ({ position }: Props): JSX.Element => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const trigger = useScrollTrigger();

  const openDrawer = (): void => {
    setMobileOpen(true);
  };

  const closeDrawer = (): void => {
    setMobileOpen(false);
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <StyledHeader isScrolled={position.y > 0}>
          <Container>
            <Toolbar>
              <Link href={HOME_PAGE} className="logo">
                <Typography variant="h5" component="span">
                  LogoLogo
                </Typography>
              </Link>
              <StyledNav component="nav">
                <List>
                  {navItems.map((item, index) =>
                    index === navItems.length - 1 ? (
                      <ListItem key={item}>
                        <ListItemButton
                          disableRipple
                          disableTouchRipple
                          component={Link}
                          href="#"
                        >
                          {item}
                        </ListItemButton>
                      </ListItem>
                    ) : (
                      <ListItem key={item}>
                        <Link className="nav-link" href="#">
                          {item}
                        </Link>
                      </ListItem>
                    ),
                  )}
                </List>
              </StyledNav>
              {position.y > 0 && (
                <StyledSearchButton>
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
          </Container>
        </StyledHeader>
      </Slide>
      <DrawerComponent openState={mobileOpen} closeDrawer={closeDrawer} />
      <HiddenToolbar />
    </>
  );
};
