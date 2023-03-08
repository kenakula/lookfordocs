import { Box } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { StyledImage } from './styled-components';
import { DOCTORS_PAGE, getImageUrl } from '@/shared/assets';

interface Props {
  isDetailedPage: boolean;
  docID: number;
  docName: string;
  imageId: string;
  detailedLocation: boolean;
}

export const DoctorCardImage = ({
  isDetailedPage,
  docID,
  docName,
  imageId,
  detailedLocation,
}: Props): JSX.Element => {
  if (!isDetailedPage) {
    return (
      <StyledImage className="image">
        <Link href={`${DOCTORS_PAGE}/${docID}`}>
          <Image
            width={360}
            height={500}
            src={getImageUrl(imageId, docName, 'quality=100')}
            alt={docName}
            priority={detailedLocation}
          />
        </Link>
      </StyledImage>
    );
  }

  return (
    <StyledImage className="image">
      <Box className="image-container">
        <Image
          width={360}
          height={500}
          src={getImageUrl(imageId, docName, 'quality=100')}
          alt={docName}
          priority={detailedLocation}
        />
      </Box>
    </StyledImage>
  );
};
