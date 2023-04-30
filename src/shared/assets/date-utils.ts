export const getDayString = (date: Date, withTime?: boolean): string => {
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const today = new Date(new Date());
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  let prefix = '';

  const isTodayDate =
    today.toLocaleDateString('ru') === date.toLocaleDateString('ru');
  const isTomorrowDate =
    tomorrow.toLocaleDateString('ru') === date.toLocaleDateString('ru');

  if (isTodayDate) {
    prefix = 'Сегодня, ';
  }

  if (isTomorrowDate) {
    prefix = 'Завтра, ';
  }

  const weekDay = weekDays[date.getDay()];
  const dateString = date.toLocaleDateString('ru', {
    day: '2-digit',
    month: 'long',
  });

  const time = withTime
    ? ` ${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    : '';

  return `${prefix}${dateString} (${weekDay})${time}`;
};
