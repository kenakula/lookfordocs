import { useMemo } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, Pagination } from 'swiper';
import { SliderComponent } from '@/components';
import { DoctorCardClinic } from '@/components/doctor-card/components';
import { IClinic } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';

interface Props {
  clinics: IClinic[];
  reembolso: boolean;
}

export const DetailedDoctorClinics = ({
  clinics,
  reembolso,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

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
        {clinics.map(clinic => (
          <DoctorCardClinic detailedLocation clinic={clinic} key={clinic.id} />
        ))}
      </Box>
    );
  }

  return (
    <SliderComponent options={sliderConfig}>
      {clinics.map(clinic => (
        <SwiperSlide tag="li" key={clinic.id}>
          <DoctorCardClinic clinic={clinic} />
        </SwiperSlide>
      ))}
    </SliderComponent>
  );
};
