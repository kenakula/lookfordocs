import Link from 'next/link';
import { Typography } from '@mui/material';
import { getRate, numWord } from '@/shared/assets';
import { useScrollToElement } from '@/shared/hooks';
import { RatingComponent } from '@/components';
import { StyledClinicRating } from './styled-components';
import { ITestimonial } from '@/shared/types';

interface Props {
  testimonials: ITestimonial[];
  detaiedLocation?: boolean;
}

export const ClinicCardRating = ({
  testimonials,
  detaiedLocation,
}: Props): JSX.Element | null => {
  const { scrollToElement } = useScrollToElement('clinic-testimonials');
  const rating = getRate(testimonials);

  const ratingText = `${testimonials.length} ${numWord(testimonials.length, [
    'отзыв',
    'отзыва',
    'отзывов',
  ])}`;

  if (!rating) {
    return null;
  }

  if (!detaiedLocation) {
    return (
      <StyledClinicRating>
        <RatingComponent rate={rating} size="small" showValue />
        <Typography variant="caption">{ratingText}</Typography>
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
      <Link
        href="#clinic-testimonials"
        onClick={e => {
          e.preventDefault();
          scrollToElement();
        }}
      >
        {ratingText}
      </Link>
    </StyledClinicRating>
  );
};
