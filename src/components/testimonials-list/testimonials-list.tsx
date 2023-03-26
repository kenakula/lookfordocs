import { useState } from 'react';
import { Typography } from '@mui/material';
import { ButtonComponent } from '@/components';
import { ITestimonial } from '@/shared/types';
import { useShowedCards } from '@/shared/hooks';
import { StyledTestimonialList, TestimonialCard } from './components';

const SHOWED_TESTIMONIALS_COUNT = 4;

interface Props {
  testimonials?: ITestimonial[];
  openTestimonialDialog: () => void;
}

export const TestimonialsList = ({
  testimonials = [],
  openTestimonialDialog,
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
    <div className="testimonials-list">
      {testimonials.length ? (
        <StyledTestimonialList>
          {showedCards.map(item => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </StyledTestimonialList>
      ) : (
        <Typography sx={{ mb: 4 }} className="testimonials-empty">
          Пока нет отзывов
        </Typography>
      )}
      <div className="testimonials-buttons">
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
          onClick={openTestimonialDialog}
        />
      </div>
    </div>
  );
};
