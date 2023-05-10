import { AnalyticsEvent, EventCategory } from '@/shared/enums';
import { IGtmEvent } from '@/shared/types';

export const baseMainPageEvent: IGtmEvent = {
  event: AnalyticsEvent.MainPage,
  category: EventCategory.ButtonClick,
  interaction: true,
};

export const mainPageAppointmentClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-appointment',
};

export const mainPagePopularClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  category: EventCategory.ElementClick,
  eventLabel: 'main-popular',
};

export const mainPageInsuranseExpandEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-insurances',
};

export const mainPageTestimonialsEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-testimonials',
  category: EventCategory.SliderEvent,
};

export const mainPageHeaderAppointmentPopupEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-header-popup',
  category: EventCategory.ButtonClick,
};

export const mainPageSocialsClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-socials',
  category: EventCategory.ElementClick,
};
