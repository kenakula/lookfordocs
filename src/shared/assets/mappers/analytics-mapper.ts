import { AnalyticsEvent, EventCategory } from '@/shared/enums';
import { IGtmEvent } from '@/shared/types';

const baseMainPageEvent: IGtmEvent = {
  event: AnalyticsEvent.MainPage,
  category: EventCategory.ButtonClick,
  interaction: true,
};

const mainPageAppointmentClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  label: 'main-appointment',
};

const mainPagePopularClickEvent: IGtmEvent = {
  ...baseMainPageEvent,
  category: EventCategory.ElemenClick,
  label: 'main-popular',
};

export const analyticsMapper = (
  eventName: string,
  eventData?: IGtmEvent,
): IGtmEvent => {
  switch (eventName) {
    case 'mainPageAppointmentClick':
      return { ...mainPageAppointmentClickEvent, ...eventData };
    case 'mainPagePopularClickEvent':
      return { ...mainPagePopularClickEvent, ...eventData };
    default:
      return baseMainPageEvent;
  }
};
