import { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { getDoctorSlots } from '@/api';
import { RNOVA_CATEGORY_ONLINE, isBrowser } from '@/shared/assets';
import { SlotModel } from '@/shared/models';
import { StyledTimetable, TimeTableDay } from './components';
import { useGetScheduleEntries } from './hooks';
import { TimetableSkeleton } from '../cupboard';
import { Navigation, Pagination, SwiperOptions } from 'swiper';
import { IconButton, Typography } from '@mui/material';
import { getDayHeader } from './assets';
import { IconArrowLeft } from '../icons';
import { IconArrowRight } from '../icons/icon-arrow-right';

interface Props {
  docId: string;
}

// TODO обработать ошибку

export const Timetable = ({ docId }: Props): JSX.Element => {
  const [activeSlideDate, setActiveSlideDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<SlotModel | null>(null);
  const { data: schedule, isLoading } = useQuery(['getSchedule', docId], {
    queryFn: () => getDoctorSlots(docId, RNOVA_CATEGORY_ONLINE),
  });

  const { entries } = useGetScheduleEntries(schedule);

  const sliderConfig: SwiperOptions = useMemo(
    () => ({
      modules: [Navigation, Pagination],
      spaceBetween: 8,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
    }),
    [],
  );

  useEffect(() => {
    if (entries && entries.length) {
      const dayString = getDayHeader(new Date(entries[0][0]));
      setActiveSlideDate(dayString);
    }
  }, [entries]);

  const onSlideChange = (index: number) => {
    if (entries && entries.length) {
      const dayString = getDayHeader(new Date(entries[index][0]));
      setActiveSlideDate(dayString);
    }
  };

  if (isLoading) {
    return <TimetableSkeleton />;
  }

  return (
    <StyledTimetable className="timetable">
      <Typography variant="h3">Записаться на онлайн прием</Typography>
      <div className="timetable-day-header">
        <IconButton
          className="button-prev slider-button"
          disableFocusRipple
          disableRipple
        >
          <IconArrowLeft />
        </IconButton>
        <Typography variant="h4">{activeSlideDate}</Typography>
        <IconButton
          className="button-next slider-button"
          disableFocusRipple
          disableRipple
        >
          <IconArrowRight />
        </IconButton>
      </div>
      <Swiper
        {...sliderConfig}
        onActiveIndexChange={swiper => onSlideChange(swiper.activeIndex)}
      >
        {entries.map(entry => (
          <SwiperSlide key={entry[0]}>
            <TimeTableDay
              key={entry[0]}
              date={new Date(entry[0])}
              slots={entry[1]}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledTimetable>
  );
};
