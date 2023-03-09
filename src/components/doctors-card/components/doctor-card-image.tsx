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
}

export const DoctorCardImage = ({
  isDetailedPage,
  docID,
  docName,
  imageId,
}: Props): JSX.Element => {
  if (!isDetailedPage) {
    return (
      <StyledImage className="image">
        <Link href={`${DOCTORS_PAGE}/${docID}`}>
          <Image
            fill
            src={getImageUrl(imageId, docName)}
            alt={docName}
            priority
            sizes="(max-width: 769px) 32.6vw, (max-width: 1129px) 23vw, 134px"
          />
        </Link>
      </StyledImage>
    );
  }

  return (
    <StyledImage className="image">
      <Box className="image-container">
        <Image
          fill
          src={getImageUrl(imageId, docName)}
          alt={docName}
          priority
          sizes="(max-width: 769px) 32.6vw, (max-width: 1129px) 23vw, 134px"
        />
      </Box>
    </StyledImage>
  );
};
