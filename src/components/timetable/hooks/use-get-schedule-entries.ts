import { useState, useEffect } from 'react';
import { SlotModel } from '@/shared/models';

interface HookValue {
  entries: [number, SlotModel[]][];
}

export const useGetScheduleEntries = (schedule?: SlotModel[]): HookValue => {
  const [scheduleEntries, setScheduleEntries] =
    useState<[number, SlotModel[]][]>();

  useEffect(() => {
    if (schedule) {
      const datesMap = new Map<number, SlotModel[]>();

      schedule.forEach(item => {
        const date = new Date(item.time_start).setHours(0, 0);

        if (!datesMap.has(date)) {
          datesMap.set(date, [item]);
        } else {
          const arr = datesMap.get(date) ?? [];

          datesMap.set(date, [...arr, item]);
        }
      });

      setScheduleEntries(Array.from(datesMap.entries()));
    }
  }, [schedule]);

  return {
    entries: scheduleEntries ?? [],
  };
};
