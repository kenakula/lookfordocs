import { event } from 'nextjs-google-analytics';
import { IGtmEvent } from '../types';
import {
  mainPageHeaderAppointmentPopupEvent,
  mainPageAppointmentClickEvent,
  mainPageInsuranseExpandEvent,
  mainPageTestimonialsEvent,
  mainPagePopularClickEvent,
  mainPageSocialsClickEvent,
  baseMainPageEvent,
} from './events';

export const eventsMapper = (
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
    default:
      return baseMainPageEvent;
  }
};

export const pushGtmEvent = (
  eventId: string,
  eventData?: Partial<IGtmEvent>,
): void => {
  event(eventId, eventsMapper(eventId, eventData));
};
