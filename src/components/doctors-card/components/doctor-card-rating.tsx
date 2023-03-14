import { RatingComponent } from '@/components';
import { numWord } from '@/shared/assets';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { StyledDoctorRating } from './styled-components';

interface Props {
  rating: number;
  testimonialsCount?: number;
  detaiedLocation?: boolean;
}

export const DoctorCardRating = ({
  rating,
  testimonialsCount,
  detaiedLocation,
}: Props): JSX.Element => {
  const ratingText = testimonialsCount
    ? `${testimonialsCount} ${numWord(testimonialsCount, [
        'отзыв',
        'отзыва',
        'отзывов',
      ])}`
    : '';

  if (!detaiedLocation) {
    return (
      <StyledDoctorRating>
        <RatingComponent rate={rating} size="small" showValue />
        {testimonialsCount ? (
          <Typography variant="caption">{ratingText}</Typography>
        ) : null}
      </StyledDoctorRating>
    );
  }

  return (
    <StyledDoctorRating>
      <RatingComponent rate={rating} size="small" showValue />
      {testimonialsCount ? (
        <Link href="#doctor-testimonials">{ratingText}</Link>
      ) : null}
    </StyledDoctorRating>
  );
};
