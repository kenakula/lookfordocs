import { Box, Typography } from '@mui/material';
import { StyledCard } from './styled-components';
import { ITestimonial } from '@/shared/types';
import { UserAvatar } from '@/components';

interface Props {
  data: ITestimonial;
}

export const TestimonialCard = ({
  data: { title, subtitle, image, date, author, text, type },
}: Props): JSX.Element => {
  const cardTitle = type === 'clinic' ? `Клиника "${title}"` : title;
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  return (
    <StyledCard>
      <Box component="header" className="card-header">
        <UserAvatar name={title} image={image} />
        <Box className="card-info">
          <Typography variant="h3" className="card-title">
            {cardTitle}
          </Typography>
          <Typography variant="body1" className="card-subtitle">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <Typography className="card-text">{text}</Typography>
      <Box className="card-footer">
        <Typography variant="body1">{author}</Typography>
        <time dateTime={dateTimeString}>{cardDate}</time>
      </Box>
    </StyledCard>
  );
};
