import { AnalyticsEvent, EventCategory } from '@/shared/enums';
import { IGtmEvent } from '@/shared/types';

const baseSmartSearchEvent: IGtmEvent = {
  event: AnalyticsEvent.SmartSearh,
  eventCategory: EventCategory.ButtonClick,
  interaction: true,
};

const smartSearchInputClick: IGtmEvent = {
  ...baseSmartSearchEvent,
  eventCategory: EventCategory.ElementClick,
  eventLabel: 'smart-search-click',
};

const smartSearchInputSearchClick: IGtmEvent = {
  ...baseSmartSearchEvent,
  eventLabel: 'smart-search-search',
};

const smartSearchInputSearch: IGtmEvent = {
  ...baseSmartSearchEvent,
  eventCategory: EventCategory.Search,
  eventLabel: 'smart-search-search',
};

const smartSearchResultClick: IGtmEvent = {
  ...baseSmartSearchEvent,
  eventCategory: EventCategory.ElementClick,
  eventLabel: 'smart-search-result',
};

const openSmartSearchButtonClick: IGtmEvent = {
  ...baseSmartSearchEvent,
  eventLabel: 'smart-search-header',
};

export const smartSearchInputEventsMapper = (
  eventId: string,
  eventData?: Partial<IGtmEvent>,
): IGtmEvent => {
  switch (eventId) {
    case 'smartSearchInputClick':
      return { ...smartSearchInputClick, ...eventData };
    case 'smartSearchInputSearchClick':
      return { ...smartSearchInputSearchClick, ...eventData };
    case 'smartSearchInputSearch':
      return { ...smartSearchInputSearch, ...eventData };
    case 'smartSearchResultClick':
      return { ...smartSearchResultClick, ...eventData };
    case 'openSmartSearchButtonClick':
      return { ...openSmartSearchButtonClick, ...eventData };
    default:
      return baseSmartSearchEvent;
  }
};
