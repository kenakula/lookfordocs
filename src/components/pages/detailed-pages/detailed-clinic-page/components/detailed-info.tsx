import { useRef, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { getClinicDoctors } from '@/api';
import {
  ButtonComponent,
  DoctorCard,
  FilterResultSkeleton,
  PaginationComponent,
  TestimonialDialog,
  TestimonialsList,
} from '@/components';
import { IClinic, ITestimonial } from '@/shared/types';
import {
  capitalize,
  CLINIC_PAGE_DOCTORS_LIMIT,
  StyledDetailedInfo,
  StyledDetailInfoBlock,
  StyledDetailInfoBlockHeader,
  StyledDetailInfoTitle,
  StyledDetailLongText,
} from '@/shared/assets';
import { useQuery } from '@tanstack/react-query';
import { StyledDetailedClinicDoctorList } from './styled-components';
// TODO рефактор
interface Props {
  data: IClinic;
  testimonials: ITestimonial[];
}

export const DetailedInfo = ({
  data: { longText, id: clinicId, image, name },
  testimonials,
}: Props): JSX.Element => {
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const blockRef = useRef<HTMLDivElement>(null);

  const setPage = (page: number) => {
    setTimeout(() => {
      if (blockRef.current) {
        blockRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);

    setPageNumber(page);
  };

  const {
    data: doctorsData,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['clinicDoctors', clinicId, pageNumber],
    queryFn: () =>
      getClinicDoctors(clinicId.toString(), {
        page: pageNumber,
        pageSize: CLINIC_PAGE_DOCTORS_LIMIT,
      }),
    staleTime: Infinity,
    keepPreviousData: true,
  });

  const handleOpenTestimonialsDialog = (): void => {
    setTestimonialDialogOpen(true);
  };

  const handleCloseTestimonialsDialog = (): void => {
    setTestimonialDialogOpen(false);
  };

  return (
    <StyledDetailedInfo ref={blockRef}>
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
        <StyledDetailInfoBlockHeader className="detailed-info-block-header">
          <StyledDetailInfoTitle variant="h3">
            Врачи клиники
          </StyledDetailInfoTitle>
        </StyledDetailInfoBlockHeader>
        {isError && (
          <Typography color="error" variant="body2" textAlign="center">
            Ошибка. Попробуйте позже.
          </Typography>
        )}
        {doctorsData && doctorsData.data ? (
          <StyledDetailedClinicDoctorList className="detailed-info-block-list">
            {doctorsData.data.map(doc => (
              <li key={doc.id}>
                <DoctorCard
                  data={doc}
                  shadowed
                  testimonials={doc.testimonials}
                />
              </li>
            ))}
            {(isFetching || isLoading) && (
              <li className="loader">
                <CircularProgress size={60} />
              </li>
            )}
          </StyledDetailedClinicDoctorList>
        ) : (
          <FilterResultSkeleton />
        )}
        {doctorsData && doctorsData.meta ? (
          <PaginationComponent
            setPage={setPage}
            page={pageNumber}
            total={doctorsData.meta.pagination.total}
            limit={CLINIC_PAGE_DOCTORS_LIMIT}
            variant="light"
          />
        ) : null}
      </StyledDetailInfoBlock>

      <StyledDetailInfoBlock
        className="detailed-info-block"
        id="clinic-testimonials"
      >
        <StyledDetailInfoBlockHeader className="detailed-info-header">
          <StyledDetailInfoTitle variant="h3">Отзывы</StyledDetailInfoTitle>
          {testimonials.length ? (
            <ButtonComponent
              text="Оставить отзыв"
              variant="outlined"
              fullWidth
              onClick={handleOpenTestimonialsDialog}
            />
          ) : null}
        </StyledDetailInfoBlockHeader>
        {/* TODO сделать как на детальке врача */}
        <TestimonialsList
          testimonials={testimonials}
          openTestimonialDialog={handleOpenTestimonialsDialog}
        />
      </StyledDetailInfoBlock>

      <TestimonialDialog
        opened={testimonialDialogOpen}
        onClose={handleCloseTestimonialsDialog}
        type="clinic"
        entityId={clinicId}
        entityName={capitalize(name)}
        entityImage={image}
      />
    </StyledDetailedInfo>
  );
};
