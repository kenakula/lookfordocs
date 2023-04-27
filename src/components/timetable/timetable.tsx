import { useEffect, useMemo, useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { Navigation, SwiperOptions } from 'swiper';
import { getDoctorSlots } from '@/api';
import { ButtonComponent, TimetableSkeleton } from '@/components';
import { IconArrowLeft, IconArrowRight } from '@/components/icons';
import { RNOVA_CATEGORY_ONLINE, getDayString } from '@/shared/assets';
import { SelectedSlot } from '@/shared/types';
import { StyledTimetable, TimeTableDay } from './components';
import { useGetScheduleEntries } from './hooks';

interface Props {
  docId: string;
  openAppointmentDialog: (slot?: SelectedSlot) => void;
}

// TODO обработать ошибку
// TODO сохранять где-то слоты на которые чел записался и их не показывать

export const Timetable = ({
  docId,
  openAppointmentDialog,
}: Props): JSX.Element => {
  const [activeSlideDate, setActiveSlideDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | null>(null);
  const { data: schedule, isLoading } = useQuery(['getSchedule', docId], {
    queryFn: () => getDoctorSlots(docId, RNOVA_CATEGORY_ONLINE),
    staleTime: 5000,
  });

  const { entries } = useGetScheduleEntries(schedule);

  const sliderConfig: SwiperOptions = useMemo(
    () => ({
      modules: [Navigation],
      spaceBetween: 8,
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
    }),
    [],
  );

  const chooseSlot = (slot: SelectedSlot) => {
    setSelectedSlot(slot);
  };

  useEffect(() => {
    if (entries && entries.length) {
      const dayString = getDayString(new Date(entries[0][0]));
      setActiveSlideDate(dayString);
    }
  }, [entries]);

  const onSlideChange = (index: number) => {
    if (entries && entries.length) {
      const dayString = getDayString(new Date(entries[index][0]));
      setActiveSlideDate(dayString);
    }
  };

  const handleButtonClick = () => {
    openAppointmentDialog(selectedSlot ?? undefined);
  };

  if (isLoading) {
    return <TimetableSkeleton />;
  }

  return (
    <StyledTimetable className="timetable">
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
        wrapperTag="ul"
        onActiveIndexChange={swiper => onSlideChange(swiper.activeIndex)}
      >
        {entries.map(entry => (
          <SwiperSlide key={entry[0]} tag="li">
            <TimeTableDay
              key={entry[0]}
              slots={entry[1]}
              onChange={chooseSlot}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <ButtonComponent
        text="Записаться"
        disabled={!selectedSlot}
        variant="contained"
        primaryColor
        size="small"
        fullWidth
        className="timetable-button"
        onClick={handleButtonClick}
        color="primary"
      />
    </StyledTimetable>
  );
};
