import { AnalyticsEvent, EventCategory } from '../enums';

export interface IGtmEvent {
  event: AnalyticsEvent;
  category: EventCategory;
  eventLabel?: string;
  eventValue?: string;
  eventContent?: string;
  interaction?: boolean;
}
