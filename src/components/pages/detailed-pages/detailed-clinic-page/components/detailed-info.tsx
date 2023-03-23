import { useRef, useState } from 'react';
import { CircularProgress, Skeleton, Typography } from '@mui/material';
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
import { StyledDetailedClinicDoctorList } from './styled-components';
import { useQuery } from '@tanstack/react-query';
import { getClinicDoctors } from '@/api';

interface Props {
  data: IClinic;
  testimonials?: ITestimonial[];
}

export const DetailedInfo = ({
  data: { longText, id: clinicId, image, name, cities },
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
    }, 100);

    setPageNumber(page);
  };

  const {
    data: doctors,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['clinicDoctors', clinicId, pageNumber],
    queryFn: () =>
      getClinicDoctors(
        clinicId.toString(),
        pageNumber,
        CLINIC_PAGE_DOCTORS_LIMIT,
      ),
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
        {doctors ? (
          <StyledDetailedClinicDoctorList className="detailed-info-block-list">
            {doctors.map(({ doctors_id }) =>
              doctors_id ? (
                <li key={doctors_id.id}>
                  <DoctorCard data={doctors_id} shadowed />
                </li>
              ) : null,
            )}
            {(isFetching || isLoading) && (
              <li className="loader">
                <CircularProgress size={60} />
              </li>
            )}
          </StyledDetailedClinicDoctorList>
        ) : (
          <FilterResultSkeleton />
        )}
        <PaginationComponent
          setPage={setPage}
          page={pageNumber}
          total={11}
          limit={CLINIC_PAGE_DOCTORS_LIMIT}
          variant="light"
        />
      </StyledDetailInfoBlock>

      {testimonials ? (
        <StyledDetailInfoBlock
          className="detailed-info-block"
          id="clinic-testimonials"
        >
          <StyledDetailInfoBlockHeader className="detailed-info-header">
            <StyledDetailInfoTitle variant="h3">Отзывы</StyledDetailInfoTitle>
            {testimonials && testimonials.length ? (
              <ButtonComponent
                text="Оставить отзыв"
                variant="outlined"
                fullWidth
                onClick={handleOpenTestimonialsDialog}
              />
            ) : null}
          </StyledDetailInfoBlockHeader>
          <TestimonialsList
            testimonials={testimonials}
            openTestimonialDialog={handleOpenTestimonialsDialog}
          />
        </StyledDetailInfoBlock>
      ) : (
        <Skeleton height={300} />
      )}

      <TestimonialDialog
        opened={testimonialDialogOpen}
        onClose={handleCloseTestimonialsDialog}
        type="clinic"
        entityId={clinicId}
        entityName={capitalize(name)}
        entityImage={image}
        city={cities[0]}
      />
    </StyledDetailedInfo>
  );
};
