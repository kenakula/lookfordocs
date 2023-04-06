import { useMemo } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions, Navigation, Pagination } from 'swiper';
import { IClinic } from '@/shared/types';
import { SliderComponent } from '@/components';
import { Breakpoints } from '@/shared/enums';
import { DoctorCardClinic } from './doctor-card-clinic';

interface Props {
  list: IClinic[];
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
        {list.map(clinic => (
          <DoctorCardClinic key={clinic.id} clinic={clinic} />
        ))}
      </div>
    );
  }

  return (
    <SliderComponent options={sliderConfig}>
      {list.map(clinic => (
        <SwiperSlide key={clinic.id} tag="li">
          <DoctorCardClinic clinic={clinic} />
        </SwiperSlide>
      ))}
    </SliderComponent>
  );
};
