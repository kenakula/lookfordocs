import { RatingComponent } from '@/components/rating-component/rating-component';
import { ITestimonial } from '@/shared/types';
import { Typography } from '@mui/material';
import { StyledTestimonial } from './styled-components';

interface Props {
  data: ITestimonial;
}

export const TestimonialCard = ({
  data: { comment, author, date, rate },
}: Props): JSX.Element => {
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  return (
    <StyledTestimonial className="testimonial-card">
      <div className="testimonial-card-header">
        <Typography variant="caption">{author}</Typography>
        <RatingComponent size="small" rate={rate} showValue />
      </div>
      <div className="testimonial-card-body">
        <Typography variant="caption">Комментарий</Typography>
        <Typography variant="body1">{comment}</Typography>
      </div>
      <div className="testimonial-card-footer">
        <Typography component="time" dateTime={dateTimeString}>
          {cardDate}
        </Typography>
      </div>
    </StyledTestimonial>
  );
};
