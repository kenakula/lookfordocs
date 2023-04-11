import { Box, alpha, styled } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export const StyledImageContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isClinic',
})<{ isClinic: boolean }>(({ theme, isClinic }) => ({
  display: 'flex',
  alignItems: 'flex-start',

  'a, .image-container': {
    position: 'relative',
    paddingBottom: isClinic ? '100%' : '136.66%',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    border: isClinic
      ? `1px solid ${alpha(theme.palette.text.primary, 0.1)}`
      : undefined,
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
  imageUrl: string;
  name: string;
  isDetailedPage: boolean;
  url?: string;
  sizes?: string;
  isClinic?: boolean;
}

export const CardImage = ({
  url,
  name,
  sizes,
  imageUrl,
  isClinic = false,
  isDetailedPage,
}: Props): JSX.Element => {
  if (url && !isDetailedPage) {
    return (
      <StyledImageContainer isClinic={isClinic} className="card-image">
        <Link href={url}>
          <Image fill src={imageUrl} alt={name} priority sizes={sizes} />
        </Link>
      </StyledImageContainer>
    );
  }

  return (
    <StyledImageContainer isClinic={isClinic} className="card-image">
      <Box className="image-container">
        <Image fill src={imageUrl} alt={name} priority sizes={sizes} />
      </Box>
    </StyledImageContainer>
  );
};
