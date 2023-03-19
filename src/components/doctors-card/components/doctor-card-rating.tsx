import Link from 'next/link';
import { Typography } from '@mui/material';
import { numWord } from '@/shared/assets';
import { RatingComponent } from '@/components';
import { StyledDoctorRating } from './styled-components';
import { useScrollToElement } from '@/shared/hooks';

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
  const { scrollToElement } = useScrollToElement('doctor-testimonials');

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
      <RatingComponent
        rate={rating}
        size="small"
        showValue
        className="detailed-location"
      />
      {testimonialsCount ? (
        <Link
          href="#doctor-testimonials"
          onClick={e => {
            e.preventDefault();
            scrollToElement();
          }}
        >
          {ratingText}
        </Link>
      ) : null}
    </StyledDoctorRating>
  );
};
