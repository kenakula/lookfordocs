export const getActiveStateClassName = (
  url: string,
  currentPath: string,
  className?: string,
): string => {
  const classNameString = className ?? 'active';

  return currentPath === url ? classNameString : '';
};
