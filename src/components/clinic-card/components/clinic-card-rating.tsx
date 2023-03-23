import Link from 'next/link';
import { Typography } from '@mui/material';
import { numWord } from '@/shared/assets';
import { useScrollToElement } from '@/shared/hooks';
import { RatingComponent } from '@/components';
import { StyledClinicRating } from './styled-components';

interface Props {
  rating: number;
  testimonialsCount?: number;
  detaiedLocation?: boolean;
}

export const ClinicCardRating = ({
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
      <StyledClinicRating>
        <RatingComponent rate={rating} size="small" showValue />
        {testimonialsCount ? (
          <Typography variant="caption">{ratingText}</Typography>
        ) : null}
      </StyledClinicRating>
    );
  }

  return (
    <StyledClinicRating>
      <RatingComponent
        rate={rating}
        size="small"
        showValue
        className="detailed-location"
      />
      {testimonialsCount ? (
        <Link
          href="#clinic-testimonials"
          onClick={e => {
            e.preventDefault();
            scrollToElement();
          }}
        >
          {ratingText}
        </Link>
      ) : null}
    </StyledClinicRating>
  );
};
