import { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { ButtonComponent } from '@/components';
import { ITestimonial } from '@/shared/types';
import { useShowedCards } from '@/shared/hooks';
import { DetailedTestimonialCard } from './detailed-testimonial-card';
import { StyledDetailedTestimonialList } from './styled-components';
import {
  StyledDetailInfoBlock,
  StyledDetailInfoBlockHeader,
  StyledDetailInfoTitle,
} from '@/shared/assets';

const SHOWED_TESTIMONIALS_COUNT = 4;

interface Props {
  testimonials: ITestimonial[];
  openDialog: () => void;
}

export const DetialedDoctorTestimonials = ({
  testimonials,
  openDialog,
}: Props): JSX.Element => {
  const [testimonialsExpanded, setTestimonialsExpanded] = useState(false);
  const { showedCards, leftCards, hasHiddenCards } =
    useShowedCards<ITestimonial>(
      testimonials,
      testimonialsExpanded,
      SHOWED_TESTIMONIALS_COUNT,
    );

  const handleExpandTestimonials = (): void => {
    setTestimonialsExpanded(prev => !prev);
  };

  return (
    <StyledDetailInfoBlock
      className="detailed-info-block"
      id="doctor-testimonials"
    >
      <StyledDetailInfoBlockHeader className="detailed-info-header">
        <StyledDetailInfoTitle variant="h3">Отзывы</StyledDetailInfoTitle>
        {testimonials.length ? (
          <ButtonComponent
            text="Оставить отзыв"
            variant="outlined"
            fullWidth
            onClick={openDialog}
          />
        ) : null}
      </StyledDetailInfoBlockHeader>

      {testimonials && testimonials.length ? (
        <StyledDetailedTestimonialList>
          {showedCards.map(item => (
            <DetailedTestimonialCard key={item.id} data={item} />
          ))}
        </StyledDetailedTestimonialList>
      ) : (
        <Typography className="detailed-info-empty">
          Пока нет отзывов
        </Typography>
      )}
      <Box className="detailed-testimonials-buttons">
        {hasHiddenCards && (
          <ButtonComponent
            text={
              testimonialsExpanded ? 'Скрыть' : `Показать ещё (${leftCards})`
            }
            variant="outlined"
            fullWidth
            onClick={handleExpandTestimonials}
          />
        )}
        <ButtonComponent
          text="Оставить отзыв"
          variant="contained"
          fullWidth
          onClick={openDialog}
        />
      </Box>
    </StyledDetailInfoBlock>
  );
};
