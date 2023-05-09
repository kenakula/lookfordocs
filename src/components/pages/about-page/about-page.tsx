import Image from 'next/image';
import { styled } from '@mui/material';
import { toggleContactDialog, useAppDispatch } from '@/stores';
import { ButtonComponent, ContainerComponent } from '@/components';
import { Title, getImageUrl } from '@/shared/assets';
import { IAboutPageData } from '@/shared/types';

const StyledSection = styled('section')(({ theme }) => ({
  padding: theme.spacing(4, 0),

  '.title': {
    marginBottom: theme.spacing(3),
  },

  '.about-page-image': {
    width: '80%',
    maxWidth: 550,
    margin: '0 auto',
    paddingBottom: '100%',
    position: 'relative',
  },

  '.about-page-content': {
    p: {
      margin: 0,
    },
  },

  '.about-page-column': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(7.5, 0),

    '.about-page-info': {
      display: 'flex',
      flexDirection: 'row-reverse',
      columnGap: theme.spacing(6),
    },

    '.about-page-image': {
      flexShrink: 0,
      width: '40%',
      paddingBottom: '34%',
    },

    '.about-page-column': {
      rowGap: theme.spacing(4),

      '.btn': {
        alignSelf: 'flex-start',
      },
    },
  },
}));

interface Props {
  data: IAboutPageData;
}

export const AboutPage = ({ data }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const openContactForm = () => {
    dispatch(toggleContactDialog(true));
  };

  return (
    <StyledSection>
      <ContainerComponent>
        <Title className="title" variant="h1">
          {data.title}
        </Title>
        <div className="about-page-info">
          <div className="about-page-image">
            <Image
              src={getImageUrl(data.image)}
              fill
              alt="изображение врачей"
            />
          </div>
          <div className="about-page-column">
            <div
              className="about-page-content"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
            <ButtonComponent
              text={data.buttonText}
              fullWidth
              variant="contained"
              onClick={openContactForm}
            />
          </div>
        </div>
      </ContainerComponent>
    </StyledSection>
  );
};
