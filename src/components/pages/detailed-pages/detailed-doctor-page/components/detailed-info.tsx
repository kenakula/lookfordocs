import { useState } from 'react';
import { Skeleton } from '@mui/material';
import { TestimonialDialog } from '@/components';
import { IDoctor } from '@/shared/types';
import {
  capitalizeName,
  StyledDetailedInfo,
  StyledDetailInfoBlock,
  StyledDetailInfoBlockHeader,
  StyledDetailInfoTitle,
  StyledDetailLongText,
} from '@/shared/assets';
import { DetailedDoctorNosology } from './detailed-doctor-nosology';
import { DetailedDoctorEducation } from './detailed-doctor-education';
import { DetialedDoctorTestimonials } from './detailed-doctor-testimonials';

interface Props {
  data: IDoctor;
}

export const DetailedInfo = ({
  data: {
    longText,
    nosologies,
    education,
    id: docId,
    fullName,
    image,
    testimonials,
  },
}: Props): JSX.Element => {
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);

  const handleOpenTestimonialsDialog = (): void => {
    setTestimonialDialogOpen(true);
  };

  const handleCloseTestimonialsDialog = (): void => {
    setTestimonialDialogOpen(false);
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

      {testimonials ? (
        <DetialedDoctorTestimonials
          testimonials={testimonials}
          openDialog={handleOpenTestimonialsDialog}
        />
      ) : (
        <Skeleton height={300} />
      )}

      {nosologies.length ? (
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
      ) : null}

      {education.length ? (
        <StyledDetailInfoBlock className="detailed-info-block">
          <StyledDetailInfoBlockHeader className="detailed-info-block-header">
            <StyledDetailInfoTitle variant="h3">
              Образование
            </StyledDetailInfoTitle>
          </StyledDetailInfoBlockHeader>
          <DetailedDoctorEducation data={education} />
        </StyledDetailInfoBlock>
      ) : null}
      <TestimonialDialog
        opened={testimonialDialogOpen}
        onClose={handleCloseTestimonialsDialog}
        type="doctor"
        entityId={docId}
        entityName={capitalizeName(fullName)}
        entityImage={image}
      />
    </StyledDetailedInfo>
  );
};
