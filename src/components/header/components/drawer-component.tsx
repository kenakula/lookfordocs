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
import { StyledDrawer, StyledSocials } from './styled-components';
import { Container } from '@/components';
import {
  IconClose,
  IconEmail,
  IconTelegram,
  IconWatsapp,
} from '@/components/icons';
import { INavigation } from '@/shared/types';

interface Props {
  closeDrawer: () => void;
  openState: boolean;
  navigation: INavigation[];
}

export const DrawerComponent = ({
  closeDrawer,
  openState,
  navigation,
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
