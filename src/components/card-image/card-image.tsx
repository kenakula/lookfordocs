import { Box, styled } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/shared/assets';

export const StyledImageContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',

  'a, .image-container': {
    position: 'relative',
    paddingBottom: '136.66%',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },

  img: {
    objectFit: 'cover',
    objectPosition: 'center',
  },

  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

interface Props {
  imageId: string;
  name: string;
  isDetailedPage: boolean;
  url?: string;
  sizes?: string;
}

export const CardImage = ({
  name,
  imageId,
  url,
  sizes,
  isDetailedPage,
}: Props): JSX.Element => {
  if (url && !isDetailedPage) {
    return (
      <StyledImageContainer className="card-image">
        <Link href={url}>
          <Image
            fill
            src={getImageUrl(imageId, name)}
            alt={name}
            priority
            sizes={sizes}
          />
        </Link>
      </StyledImageContainer>
    );
  }

  return (
    <StyledImageContainer className="card-image">
      <Box className="image-container">
        <Image
          fill
          src={getImageUrl(imageId, name)}
          alt={name}
          priority
          sizes={sizes}
        />
      </Box>
    </StyledImageContainer>
  );
};
