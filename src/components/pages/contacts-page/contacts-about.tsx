import Link from 'next/link';
import { ButtonComponent, ContainerComponent } from '@/components';
import { Title, getTypography } from '@/shared/assets';
import { IContactsPageData } from '@/shared/types';
import { Typography, styled } from '@mui/material';

const StyledSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(3, 0),
  backgroundColor: theme.palette.misc.main,

  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.contacts-text': {
    marginBottom: theme.spacing(4),
  },

  '.btn': {
    backgroundColor: theme.palette.background.default,
  },

  [theme.breakpoints.up('lmd')]: {
    padding: theme.spacing(6, 0),

    '.title': {
      marginBottom: theme.spacing(4),
    },

    '.contacts-text': {
      ...getTypography(theme, 16, 20),
      maxWidth: '60%',
    },
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(7, 0),

    '.contacts-text': {
      maxWidth: '70%',
    },
  },

  [theme.breakpoints.up('xl')]: {
    padding: theme.spacing(9, 0),
  },
}));

interface Props {
  data: IContactsPageData;
}

export const ContactsAbout = ({ data }: Props): JSX.Element => {
  return (
    <StyledSection>
      <ContainerComponent>
        <Title
          minor
          className="title"
          variant="h2"
          dangerouslySetInnerHTML={{ __html: data.aboutTitle }}
        />
        <Typography
          className="contacts-text"
          variant="body2"
          dangerouslySetInnerHTML={{ __html: data.aboutContent }}
        />
        <ButtonComponent
          variant="outlined"
          text="Узнать больше"
          href={data.aboutButtonLink}
          LinkComponent={Link}
        />
      </ContainerComponent>
    </StyledSection>
  );
};
