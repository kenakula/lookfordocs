import { useMemo } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, Pagination } from 'swiper';
import { DoctorCardClinic } from './doctor-card-clinic';
import { ClinicsRef } from '@/shared/types';
import { SliderComponent } from '@/components';
import { DESKTOP_BREAKPOINT } from '@/shared/assets';

interface Props {
  list: ClinicsRef[];
}

export const DoctorClinics = ({ list }: Props): JSX.Element => {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

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

  if (!list.length) {
    return (
      <Typography className="doctors-no-clinic">
        Только частная практика
      </Typography>
    );
  }

  if (isDesktop) {
    return (
      <Box className="clinics-wrapper">
        {list.map(({ clinics_id }) => (
          <DoctorCardClinic key={clinics_id.id} clinic={clinics_id} />
        ))}
      </Box>
    );
  }

  return (
    <SliderComponent options={sliderConfig}>
      {list.map(({ clinics_id }) => (
        <SwiperSlide key={clinics_id.id} tag="li">
          <DoctorCardClinic clinic={clinics_id} />
        </SwiperSlide>
      ))}
    </SliderComponent>
  );
};
