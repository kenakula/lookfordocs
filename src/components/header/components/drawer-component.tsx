import { useRouter } from 'next/router';
import {
  Typography,
  List,
  ListItem,
  ListItemButton,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ContainerComponent, Socials } from '@/components';
import { IconClose } from '@/components/icons';
import { IImage, ILink, ISocial } from '@/shared/types';
import { getActiveStateClassName, getImageUrl } from '@/shared/assets';
import { StyledDrawer, StyledSocials } from './styled-components';
import Link from 'next/link';

interface Props {
  closeDrawer: () => void;
  openAppointmentForm: () => void;
  openState: boolean;
  navigation: ILink[];
  socials: ISocial[];
  logo: IImage;
  copyrights: string;
}

export const DrawerComponent = ({
  openAppointmentForm,
  closeDrawer,
  navigation,
  copyrights,
  openState,
  socials,
  logo,
}: Props): JSX.Element => {
  const router = useRouter();

  return (
    <nav>
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
          <Image
            src={getImageUrl(logo)}
            width="150"
            height="20"
            alt="логотип сайта"
          />
          <IconButton disableFocusRipple disableRipple onClick={closeDrawer}>
            <IconClose id="menu" color="inherit" />
          </IconButton>
        </ContainerComponent>
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
        <StyledSocials>
          <Socials socials={socials} />
        </StyledSocials>
        <Typography variant="caption" className="copyrights">
          {copyrights}
        </Typography>
      </StyledDrawer>
    </nav>
  );
};
