import { IconButton, styled } from '@mui/material';
import Link from 'next/link';
import { IconEmail, IconWatsapp, IconTelegram } from '../icons';
import { ISocial, SocialType } from '@/shared/types';

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
  },

  svg: {
    fill: theme.palette.primary.main,
  },
}));

interface Props {
  socials: ISocial[];
  dense?: boolean;
}

export const getSocialIcon = (type: SocialType): JSX.Element | null => {
  switch (type) {
    case 'email':
      return <IconEmail />;
    case 'telegram':
      return <IconTelegram />;
    case 'watsapp':
      return <IconWatsapp />;
    default:
      return null;
  }
};

export const Socials = ({ dense, socials }: Props): JSX.Element => {
  return (
    <StyledSocials dense={dense}>
      {socials.map(({ label, link, type }) => (
        <li key={label}>
          <IconButton component={Link} href={link}>
            <span className="visually-hidden">{label}</span>
            {getSocialIcon(type)}
          </IconButton>
        </li>
      ))}
    </StyledSocials>
  );
};
