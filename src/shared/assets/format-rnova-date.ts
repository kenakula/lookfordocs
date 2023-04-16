export const formatRnovaDate = (date: Date, withTime?: boolean): string => {
  const dateString = date.toLocaleDateString('ru-RU');
  const timeString = withTime
    ? ` ${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`
    : '';
  return dateString + timeString;
};
