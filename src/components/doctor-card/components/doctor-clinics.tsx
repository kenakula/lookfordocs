import { useMemo } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, Pagination } from 'swiper';
import { ClinicsRef } from '@/shared/types';
import { SliderComponent } from '@/components';
import { Breakpoints } from '@/shared/enums';
import { DoctorCardClinic } from './doctor-card-clinic';

interface Props {
  list: ClinicsRef[];
}

export const DoctorClinics = ({ list }: Props): JSX.Element => {
  const isDesktop = useMediaQuery(Breakpoints.Desktop);

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
      <div className="clinics-wrapper">
        {list.map(({ clinics_id }) => (
          <DoctorCardClinic key={clinics_id.id} clinic={clinics_id} />
        ))}
      </div>
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
