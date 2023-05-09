import { AnalyticsEvent, EventCategory } from '../enums';

export interface IGtmEvent {
  event: AnalyticsEvent;
  category: EventCategory;
  label?: string;
  eventValue?: string;
  content?: string;
  interaction?: boolean;
}
