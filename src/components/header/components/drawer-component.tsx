import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { DRAWER_WIDTH, navItems } from '../assets';

interface Props {
  openDrawer: () => void;
  closeDrawer: () => void;
  openState: boolean;
}

export const DrawerComponent = ({
  openDrawer,
  closeDrawer,
  openState,
}: Props): JSX.Element => {
  return (
    <Box component="nav">
      <SwipeableDrawer
        variant="temporary"
        open={openState}
        anchor="right"
        onOpen={openDrawer}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { lg: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: DRAWER_WIDTH,
          },
        }}
      >
        <Box onClick={closeDrawer} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            LogoLogo
          </Typography>
          <Divider />
          <List>
            {navItems.map(item => (
              <ListItem key={item} disablePadding>
                <ListItemButton
                  sx={{ textAlign: 'center' }}
                  component={Link}
                  href="#"
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};
