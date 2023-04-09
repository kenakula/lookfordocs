import Link from 'next/link';
import { Typography } from '@mui/material';
import { getRate, numWord } from '@/shared/assets';
import { RatingComponent } from '@/components';
import { StyledDoctorRating } from './styled-components';
import { useScrollToElement } from '@/shared/hooks';
import { ITestimonial } from '@/shared/types';

interface Props {
  testimonials: ITestimonial[];
  detaiedLocation: boolean;
}

export const DoctorCardRating = ({
  testimonials,
  detaiedLocation,
}: Props): JSX.Element | null => {
  const { scrollToElement } = useScrollToElement('doctor-testimonials');
  const reviewedTestimonials = testimonials
    .slice()
    .filter(({ reviewed }) => Boolean(reviewed));
  const rating = getRate(reviewedTestimonials);

  const ratingText = `${reviewedTestimonials.length} ${numWord(
    reviewedTestimonials.length,
    ['отзыв', 'отзыва', 'отзывов'],
  )}`;

  if (!rating) {
    return null;
  }

  if (!detaiedLocation) {
    return (
      <StyledDoctorRating>
        <RatingComponent rate={rating} size="small" showValue />
        <Typography variant="caption">{ratingText}</Typography>
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
      <Link
        href="#doctor-testimonials"
        onClick={e => {
          e.preventDefault();
          scrollToElement();
        }}
      >
        {ratingText}
      </Link>
    </StyledDoctorRating>
  );
};
