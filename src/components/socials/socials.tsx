import { IconButton, styled } from '@mui/material';
import Link from 'next/link';
import { ISocial, SocialType } from '@/shared/types';
import { pushGtmEvent } from '@/shared/assets';
import { IconEmail, IconWatsapp, IconTelegram } from '../icons';

const StyledSocials = styled('ul', {
  shouldForwardProp: prop => prop !== 'dense',
})<{ dense?: boolean }>(({ theme, dense }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',

  '.MuiIconButton-root': {
    marginRight: dense ? 0 : theme.spacing(1.5),

    '&:last-child': {
      marginRight: 0,
    },

    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },
  },

  svg: {
    fill: theme.palette.primary.main,
  },
}));

interface Props {
  socials: ISocial[];
  dense?: boolean;
  location: 'footer' | 'header';
}

export const getSocialIcon = (type: SocialType): JSX.Element | null => {
  switch (type) {
    case 'email':
      return <IconEmail id="icon-email" />;
    case 'telegram':
      return <IconTelegram />;
    case 'watsapp':
      return <IconWatsapp />;
    default:
      return null;
  }
};

export const Socials = ({ dense, socials }: Props): JSX.Element => {
  const onLinkClick = (link: string) => {
    pushGtmEvent('mainPageSocialsClickEvent', {
      eventContent: link,
    });
  };

  return (
    <StyledSocials dense={dense}>
      {socials.map(({ label, link, type }) => (
        <li key={label}>
          <IconButton
            component={Link}
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            disableFocusRipple
            onClick={() => onLinkClick(link)}
          >
            <span className="visually-hidden">{label}</span>
            {getSocialIcon(type)}
          </IconButton>
        </li>
      ))}
    </StyledSocials>
  );
};
