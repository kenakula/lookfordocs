import { Box, IconButton } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { Navigation, Pagination } from 'swiper';
import { StyledInner, TestimonialCard } from './components';
import { PageSection, Title } from '@/shared/assets';
import { ITestimonial } from '@/shared/types';
import { ContainerComponent } from '@/components';
import 'swiper/css/bundle';
import { IconArrowLeft } from '@/components/icons';
import { IconArrowRight } from '@/components/icons/icon-arrow-right';

interface Props {
  testimonials: ITestimonial[] | null;
}

export const MainTestimonials = ({ testimonials = [] }: Props): JSX.Element => {
  const sliderConfig: SwiperOptions = {
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
    breakpoints: {
      600: {
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
        centeredSlides: false,
      },
      1128: {
        centeredSlides: false,
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  };

  return (
    <PageSection bgColor="blue">
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Отзывы
          </Title>
          <Swiper {...sliderConfig} wrapperTag="ul">
            {testimonials &&
              testimonials.map(item => (
                <SwiperSlide key={item.id} tag="li">
                  <TestimonialCard data={item} />
                </SwiperSlide>
              ))}
          </Swiper>
          <Box className="slider-buttons">
            <IconButton
              className="button-prev slider-button"
              disableFocusRipple
              disableRipple
            >
              <IconArrowLeft />
            </IconButton>
            <IconButton
              className="button-next slider-button"
              disableFocusRipple
              disableRipple
            >
              <IconArrowRight />
            </IconButton>
          </Box>
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
