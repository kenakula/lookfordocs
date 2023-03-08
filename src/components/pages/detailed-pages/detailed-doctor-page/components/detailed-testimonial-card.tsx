import { ITestimonial } from '@/shared/types';
import { Box, Typography } from '@mui/material';
import { StyledDetailedTestimonial } from './styled-components';

interface Props {
  data: ITestimonial;
}

export const DetailedTestimonialCard = ({
  data: { comment, author, date },
}: Props): JSX.Element => {
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  return (
    <StyledDetailedTestimonial className="testimonial-card">
      <Box className="testimonial-card-header">
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Box className="testimonial-card-body">
        <Typography variant="caption">Комментарий</Typography>
        <Typography variant="body1">{comment}</Typography>
      </Box>
      <Box className="testimonial-card-footer">
        <Typography component="time" dateTime={dateTimeString}>
          {cardDate}
        </Typography>
      </Box>
    </StyledDetailedTestimonial>
  );
};
