import { ContainerComponent } from '@/components';
import { getImageUrl, Subtitle } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';
import { IImage } from '@/shared/types';
import { styled } from '@mui/material';
import Image from 'next/image';

const StyledUnderConstructionPage = styled('section')(({ theme }) => ({
  padding: theme.spacing(4, 0),

  '.MuiTypography-h2': {
    marginBottom: theme.spacing(4),
  },

  '.image-wrapper': {
    display: 'flex',
    justifyContent: 'center',
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(8),

    '.MuiTypography-h2': {
      marginBottom: theme.spacing(8),
    },

    '.MuiTypography-body1': {
      marginBottom: theme.spacing(2),
    },

    img: {
      width: 500,
      height: 500,
    },
  },
}));

interface Props {
  image: IImage;
  children: JSX.Element;
}

export const UnderConstructionPage = ({
  image,
  children,
}: Props): JSX.Element => {
  return (
    <ContainerComponent>
      <StyledUnderConstructionPage>
        {children}
        <Subtitle textAlign="center">Страница находится в разработке</Subtitle>
        <div className="image-wrapper">
          <Image
            src={getImageUrl(image, ImageSize.Medium)}
            width={270}
            height={270}
            alt=""
          />
        </div>
      </StyledUnderConstructionPage>
    </ContainerComponent>
  );
};
