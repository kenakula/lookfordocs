export const formatRnovaDate = (date: Date): string => {
  const dateString = date.toLocaleDateString('ru-RU');

  return `${dateString} ${date.getHours()}:${date.getMinutes()}`;
};
