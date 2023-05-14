import { event } from 'nextjs-google-analytics';
import { IGtmEvent } from '../types';
import { mainPageEventsMapper, smartSearchInputEventsMapper } from './events';

export const pushMainGtmEvent = (
  eventId: string,
  eventData?: Partial<IGtmEvent>,
): void => {
  event(eventId, mainPageEventsMapper(eventId, eventData));
};

export const pushSmartSearchGtmEvent = (
  eventId: string,
  eventData?: Partial<IGtmEvent>,
): void => {
  event(eventId, smartSearchInputEventsMapper(eventId, eventData));
};
