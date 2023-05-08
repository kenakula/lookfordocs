import { RatingComponent } from '@/components/rating-component/rating-component';
import { ITestimonial } from '@/shared/types';
import { Box, Typography } from '@mui/material';
import { StyledDetailedTestimonial } from './styled-components';

interface Props {
  data: ITestimonial;
  docName: string;
}

export const DetailedTestimonialCard = ({
  data: { comment, author, date, rate },
  docName,
}: Props): JSX.Element => {
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  return (
    <StyledDetailedTestimonial
      className="testimonial-card"
      itemScope
      itemType="https://schema.org/Review"
    >
      <meta itemProp="datePublished" content={dateTimeString} />
      <div
        itemProp="itemReviewed"
        itemScope
        itemType="https://schema.org/Person"
      >
        <meta itemProp="name" content={docName} />
      </div>
      <Box className="testimonial-card-header">
        <Typography
          variant="caption"
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span itemProp="name">{author}</span>
        </Typography>
        <RatingComponent size="small" rate={rate} showValue />
      </Box>
      <Box className="testimonial-card-body">
        <Typography variant="caption">Комментарий</Typography>
        <Typography variant="body1" itemProp="reviewBody">
          {comment}
        </Typography>
      </Box>
      <Box className="testimonial-card-footer">
        <Typography component="time" dateTime={dateTimeString}>
          {cardDate}
        </Typography>
      </Box>
    </StyledDetailedTestimonial>
  );
};
