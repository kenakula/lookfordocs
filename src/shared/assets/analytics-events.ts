import { event } from 'nextjs-google-analytics';
import { analyticsMapper } from './mappers';
import { IGtmEvent } from '../types';

export const pushGaEvent = (eventName: string, eventData?: IGtmEvent): void => {
  event(eventName, analyticsMapper(eventName, eventData));
};
