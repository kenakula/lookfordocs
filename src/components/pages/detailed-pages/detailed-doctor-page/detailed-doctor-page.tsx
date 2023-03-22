import { Box, useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent, DoctorCard } from '@/components';
import { ICity, IDoctor, IInsurance } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import {
  DetailedDoctorClinics,
  DetailedInfo,
  StyledDetailedPageLayout,
} from './components';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDocTestimonials } from '@/api';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { capitilizeName } from '@/shared/assets';

interface Props {
  data: IDoctor;
  cities: ICity[];
  insurances: IInsurance[];
}

export const DetailedDoctorPage = ({
  data,
  cities,
  insurances,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const docId = data.id.toString();
  const { data: testimonials } = useQuery({
    queryKey: ['docTestimonials', docId],
    queryFn: () => getDocTestimonials(docId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const dispatch = useAppDispatch();

  const doctorName = useMemo(
    () => capitilizeName(data.firstName, data.lastName),
    [data.firstName, data.lastName],
  );

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({
        name: doctorName,
        id: data.id,
        image: data.image,
        type: 'doctor',
      }),
    );
  };

  const testimonialsCount = testimonials ? testimonials.length : undefined;
  const avarageRating = useMemo(() => {
    if (!testimonials) {
      return undefined;
    }

    const sum = testimonials.reduce((prev, curr) => prev + curr.rate, 0);
    return sum === 0 ? 0 : sum / testimonials.length;
  }, [testimonials]);

  return (
    <ContainerComponent>
      <StyledDetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о враче</h2>
        <Box className="detailed-left-column">
          <DoctorCard
            data={data}
            detailedLocation
            rating={avarageRating}
            testimonialsCount={testimonialsCount}
          />
          {isTablet ? (
            <DetailedInfo data={data} testimonials={testimonials} />
          ) : null}
        </Box>
        <Box className="detailed-right-column">
          <Box className="sticky-block">
            <ButtonComponent
              className="detailed-button"
              text="Записаться к врачу"
              fullWidth
              variant="contained"
              size="large"
              onClick={openRequestForm}
            />
            <DetailedDoctorClinics
              clinics={data.clinics}
              cities={cities}
              insurances={insurances}
              reembolso={data.reembolso}
            />
          </Box>
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          {!isTablet ? (
            <DetailedInfo data={data} testimonials={testimonials} />
          ) : null}
        </Box>
      </StyledDetailedPageLayout>
    </ContainerComponent>
  );
};
