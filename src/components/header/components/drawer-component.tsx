import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { navItems } from '../assets';
import { StyledDrawer, StyledSocials } from './styled-components';
import { Container } from '@/components';
import {
  IconClose,
  IconEmail,
  IconTelegram,
  IconWatsapp,
} from '@/components/icons';

interface Props {
  closeDrawer: () => void;
  openState: boolean;
}

export const DrawerComponent = ({
  closeDrawer,
  openState,
}: Props): JSX.Element => {
  return (
    <Box component="nav">
      <StyledDrawer
        variant="temporary"
        open={openState}
        anchor="right"
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box>
          <Container>
            <Typography variant="h6" component="p">
              LogoLogo
            </Typography>
            <IconButton onClick={closeDrawer}>
              <IconClose />
            </IconButton>
          </Container>
          <List>
            {navItems.map((item, index) =>
              index === navItems.length - 1 ? (
                <ListItem key={item}>
                  <ListItemButton
                    disableRipple
                    disableTouchRipple
                    component={Link}
                    onClick={closeDrawer}
                    href="#"
                  >
                    {item}
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem key={item}>
                  <Link className="nav-link" href="#" onClick={closeDrawer}>
                    {item}
                  </Link>
                </ListItem>
              ),
            )}
          </List>
          <StyledSocials>
            <IconButton component={Link} href="mailto:ololo@mail.ru">
              <IconEmail />
            </IconButton>
            <IconButton component={Link} href="wp:ololo@mail.ru">
              <IconWatsapp />
            </IconButton>
            <IconButton component={Link} href="tg:ololo@mail.ru">
              <IconTelegram />
            </IconButton>
          </StyledSocials>
        </Box>
      </StyledDrawer>
    </Box>
  );
};
