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
import { ContainerComponent, Socials } from '@/components';
import { IconClose } from '@/components/icons';
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
        <ContainerComponent>
          <Typography variant="h6" component="p">
            LogoLogo
          </Typography>
          <IconButton onClick={closeDrawer}>
            <IconClose />
          </IconButton>
        </ContainerComponent>
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
          <Socials />
        </StyledSocials>
        <Typography variant="caption" className="copyrights">
          © 2021 LLC &quot;InfoService Group&quot; PSRN 1127847488944
        </Typography>
      </StyledDrawer>
    </Box>
  );
};
