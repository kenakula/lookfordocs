import { Box, useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent, DoctorsCard } from '@/components';
import { ICity, IDoctor, IInsurance, ITestimonial } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import {
  DetailedDoctorClinics,
  DetailedInfo,
  StyledDetailedPageLayout,
} from './components';

interface Props {
  data: IDoctor;
  cities: ICity[];
  insurances: IInsurance[];
  testimonials: ITestimonial[];
}

export const DetailedDoctorPage = ({
  data,
  cities,
  insurances,
  testimonials,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

  return (
    <ContainerComponent>
      <StyledDetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о враче</h2>
        <Box className="detailed-left-column">
          <DoctorsCard data={data} detailedLocation />
          {isTablet && <DetailedInfo data={data} testimonials={testimonials} />}
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
            />
          </Box>
        </Box>
        {!isTablet && <DetailedInfo data={data} testimonials={testimonials} />}
      </StyledDetailedPageLayout>
    </ContainerComponent>
  );
};
