import { AnalyticsEvent, EventCategory } from '@/shared/enums';
import { IGtmEvent } from '@/shared/types';

const baseMainPageEvent: IGtmEvent = {
  event: AnalyticsEvent.MainPage,
  eventCategory: EventCategory.ButtonClick,
  interaction: true,
};

const mainPageAppointmentClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-appointment',
};

const mainPagePopularClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventCategory: EventCategory.ElementClick,
  eventLabel: 'main-popular',
};

const mainPageInsuranseExpandEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-insurances',
};

const mainPageTestimonialsEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-testimonials',
  eventCategory: EventCategory.SliderEvent,
};

const mainPageHeaderAppointmentPopupEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-header-popup',
  eventCategory: EventCategory.ButtonClick,
};

const mainPageSocialsClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  eventLabel: 'main-socials',
  eventCategory: EventCategory.ElementClick,
};

const appointmentFormSumbitEvent: IGtmEvent = {
  event: AnalyticsEvent.RequestEvent,
  eventLabel: 'appointment-form',
  eventCategory: EventCategory.FormSubmit,
  interaction: true,
};

const feedbackFormSumbitEvent: IGtmEvent = {
  event: AnalyticsEvent.FeedbackEvent,
  eventLabel: 'feedback-form',
  eventCategory: EventCategory.FormSubmit,
  interaction: true,
};

const testimonialsFormSumbitEvent: IGtmEvent = {
  event: AnalyticsEvent.TestimonialEvent,
  eventLabel: 'testimonial-form',
  eventCategory: EventCategory.FormSubmit,
  interaction: true,
};

export const mainPageEventsMapper = (
  eventId: string,
  eventData?: Partial<IGtmEvent>,
): IGtmEvent => {
  switch (eventId) {
    case 'mainPageAppointmentClick':
      return { ...mainPageAppointmentClickEvent, ...eventData };
    case 'mainPagePopularClickEvent':
      return { ...mainPagePopularClickEvent, ...eventData };
    case 'mainPageInsuranseExpandEvent':
      return { ...mainPageInsuranseExpandEvent, ...eventData };
    case 'mainPageTestimonialsEvent':
      return { ...mainPageTestimonialsEvent, ...eventData };
    case 'mainPageHeaderAppointmentPopupEvent':
      return { ...mainPageHeaderAppointmentPopupEvent, ...eventData };
    case 'mainPageSocialsClickEvent':
      return { ...mainPageSocialsClickEvent, ...eventData };
    case 'appointmentFormSumbitEvent':
      return { ...appointmentFormSumbitEvent, ...eventData };
    case 'feedbackFormSumbitEvent':
      return { ...feedbackFormSumbitEvent, ...eventData };
    case 'testimonialsFormSumbitEvent':
      return { ...testimonialsFormSumbitEvent, ...eventData };
    default:
      return baseMainPageEvent;
  }
};
