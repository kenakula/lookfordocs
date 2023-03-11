import { useMemo } from 'react';
import { SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { Navigation, Pagination } from 'swiper';
import { PageSection, Title } from '@/shared/assets';
import { ITestimonial } from '@/shared/types';
import { ContainerComponent, SliderComponent } from '@/components';
import { StyledInner, TestimonialCard } from './components';
import 'swiper/css/bundle';

interface Props {
  testimonials: ITestimonial[];
}

export const MainTestimonials = ({ testimonials = [] }: Props): JSX.Element => {
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
    }),
    [],
  );

  return (
    <PageSection bgColor="blue">
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Отзывы
          </Title>
          <SliderComponent options={sliderConfig}>
            {testimonials.map(item => (
              <SwiperSlide key={item.id} tag="li">
                <TestimonialCard data={item} />
              </SwiperSlide>
            ))}
          </SliderComponent>
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
