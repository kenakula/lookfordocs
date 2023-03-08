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

export const CardImage = ({
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
            width={120}
            height={164}
            src={getImageUrl(imageId, docName)}
            alt={docName}
          />
        </Link>
      </StyledImage>
    );
  }

  return (
    <StyledImage className="image">
      <Box className="image-container">
        <Image
          width={120}
          height={164}
          src={getImageUrl(imageId, docName)}
          alt={docName}
        />
      </Box>
    </StyledImage>
  );
};
