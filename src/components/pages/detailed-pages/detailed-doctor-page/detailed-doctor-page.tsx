import { Box, useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent, DoctorsCard } from '@/components';
import { ICity, IDoctor, IInsurance } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import {
  DetailedDoctorClinics,
  DetailedInfo,
  StyledDetailedPageLayout,
} from './components';
import { useMemo } from 'react';
import { useGetDocsTestimonialsQuery } from '@/stores/api';

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
  const { data: testimonials } = useGetDocsTestimonialsQuery(
    data.id.toString(),
  );

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
          <DoctorsCard
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
