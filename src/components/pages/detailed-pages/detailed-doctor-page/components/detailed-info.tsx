import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ButtonComponent } from '@/components';
import { IDoctor, ITestimonial } from '@/shared/types';
import { useShowedCards } from '@/shared/hooks';
import {
  StyledDetailedInfo,
  StyledDetailInfoTitle,
  StyledDetailLongText,
  StyledDetailInfoBlock,
  StyledDetailInfoBlockHeader,
  StyledDetailedTestimonialList,
} from './styled-components';
import { DetailedTestimonialCard } from './detailed-testimonial-card';
import { DetailedDoctorNosology } from './detailed-doctor-nosology';
import { DetailedDoctorEducation } from './detailed-doctor-education';

const SHOWED_TESTIMONIALS_COUNT = 4;

interface Props {
  data: IDoctor;
  testimonials: ITestimonial[];
}

export const DetailedInfo = ({
  data: { longText, nosologies, education },
  testimonials,
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
    <StyledDetailedInfo>
      {longText && (
        <StyledDetailInfoBlock className="detailed-info-block">
          <StyledDetailInfoBlockHeader className="detailed-info-block-header">
            <StyledDetailInfoTitle variant="h3">Описание</StyledDetailInfoTitle>
          </StyledDetailInfoBlockHeader>

          <StyledDetailLongText
            dangerouslySetInnerHTML={{ __html: longText }}
          />
        </StyledDetailInfoBlock>
      )}

      <StyledDetailInfoBlock className="detailed-info-block">
        <StyledDetailInfoBlockHeader className="detailed-info-header">
          <StyledDetailInfoTitle variant="h3">Отзывы</StyledDetailInfoTitle>
          {testimonials.length ? (
            <ButtonComponent
              text="Оставить отзыв"
              variant="outlined"
              fullWidth
            />
          ) : null}
        </StyledDetailInfoBlockHeader>

        {testimonials.length ? (
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
          />
        </Box>
      </StyledDetailInfoBlock>

      {nosologies && (
        <StyledDetailInfoBlock className="detailed-info-block">
          <StyledDetailInfoBlockHeader className="detailed-info-block-header">
            <StyledDetailInfoTitle variant="h3">
              Специализация
            </StyledDetailInfoTitle>
          </StyledDetailInfoBlockHeader>
          <ul>
            {nosologies.map(item => (
              <DetailedDoctorNosology key={item.group} data={item} />
            ))}
          </ul>
        </StyledDetailInfoBlock>
      )}

      {education && (
        <StyledDetailInfoBlock className="detailed-info-block">
          <StyledDetailInfoBlockHeader className="detailed-info-block-header">
            <StyledDetailInfoTitle variant="h3">
              Образование
            </StyledDetailInfoTitle>
          </StyledDetailInfoBlockHeader>
          <DetailedDoctorEducation data={education} />
        </StyledDetailInfoBlock>
      )}
    </StyledDetailedInfo>
  );
};
