import { useCallback, useMemo } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, Pagination } from 'swiper';
import { SliderComponent } from '@/components';
import { DoctorCardClinic } from '@/components/doctors-card/components';
import { ClinicsRef, ICity, IClinic, IInsurance } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';

interface Props {
  clinics: ClinicsRef[];
  cities: ICity[];
  insurances: IInsurance[];
  reembolso?: boolean;
}

export const DetailedDoctorClinics = ({
  clinics,
  cities,
  insurances,
  reembolso,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

  const getClinicData = useCallback(
    (clinic: IClinic) => {
      const clinicCities = cities.filter(
        city => city.id === (clinic.cities[0] as unknown as number),
      );
      const clinicInsurances = insurances.filter(ins => {
        const ids = clinic.insurances as unknown as number[];
        return ids.includes(ins.id);
      });

      const result: IClinic = {
        ...clinic,
        cities: clinicCities.map(city => ({ cities_id: city })),
        insurances: clinicInsurances.map(ins => ({ insurances_id: ins })),
      };

      return result;
    },
    [cities, insurances],
  );

  const sliderConfig: SwiperOptions = useMemo(
    () => ({
      modules: [Navigation, Pagination],
      spaceBetween: 8,
      centeredSlides: true,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      pagination: {
        clickable: true,
        dynamicBullets: true,
      },
    }),
    [],
  );

  if (!clinics.length) {
    return (
      <>
        <Typography className="doctors-no-clinic">
          Только частная практика
        </Typography>
        {reembolso && (
          <Typography className="doctors-reembolso">
            Возможность получения возмещения оказанных услуг в страховой
            компании по программе reembolso
          </Typography>
        )}
      </>
    );
  }

  if (isTablet) {
    return (
      <Box className="clinics-wrapper">
        {clinics.map(({ clinics_id }) => (
          <DoctorCardClinic
            detailedLocation
            clinic={getClinicData(clinics_id)}
            key={clinics_id.id}
          />
        ))}
      </Box>
    );
  }

  return (
    <SliderComponent options={sliderConfig}>
      {clinics.map(({ clinics_id }) => (
        <SwiperSlide tag="li" key={clinics_id.id}>
          <DoctorCardClinic clinic={getClinicData(clinics_id)} />
        </SwiperSlide>
      ))}
    </SliderComponent>
  );
};
