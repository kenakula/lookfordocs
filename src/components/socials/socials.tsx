import { IconButton, styled } from '@mui/material';
import Link from 'next/link';
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
  },

  svg: {
    fill: theme.palette.primary.main,
  },
}));

interface Props {
  dense?: boolean;
}

export const Socials = ({ dense }: Props): JSX.Element => {
  return (
    <StyledSocials dense={dense}>
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
  );
};
