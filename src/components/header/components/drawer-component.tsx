import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  IconButton,
  SvgIcon,
} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { StyledDrawer, StyledSocials } from './styled-components';
import { ContainerComponent, Socials } from '@/components';
import { IImage, INavigation, ISocial } from '@/shared/types';
import { getImageUrl } from '@/shared/assets';

interface Props {
  closeDrawer: () => void;
  openState: boolean;
  navigation: INavigation[];
  socials: ISocial[];
  logo: IImage;
}

export const DrawerComponent = ({
  closeDrawer,
  openState,
  navigation,
  socials,
  logo,
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
          <Image
            src={getImageUrl(logo.id, 'logo')}
            width="115"
            height="33"
            alt="логотип сайта"
          />
          <IconButton onClick={closeDrawer}>
            <SvgIcon>
              <g clipPath="url(#clip0_298_639)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.70711 6.29289C7.31658 5.90237 6.68342 5.90237 6.29289 6.29289C5.90237 6.68342 5.90237 7.31658 6.29289 7.70711L10.5858 12L6.29289 16.2929C5.90237 16.6834 5.90237 17.3166 6.29289 17.7071C6.68342 18.0976 7.31658 18.0976 7.70711 17.7071L12 13.4142L16.2929 17.7071C16.6834 18.0976 17.3166 18.0976 17.7071 17.7071C18.0976 17.3166 18.0976 16.6834 17.7071 16.2929L13.4142 12L17.7071 7.70711C18.0976 7.31658 18.0976 6.68342 17.7071 6.29289C17.3166 5.90237 16.6834 5.90237 16.2929 6.29289L12 10.5858L7.70711 6.29289Z"
                  fill="#071530"
                />
              </g>
              <defs>
                <clipPath id="clip0_298_639">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </SvgIcon>
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
          <Socials socials={socials} />
        </StyledSocials>
        <Typography variant="caption" className="copyrights">
          © 2021 LLC &quot;InfoService Group&quot; PSRN 1127847488944
        </Typography>
      </StyledDrawer>
    </Box>
  );
};
