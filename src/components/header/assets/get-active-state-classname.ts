export const getActiveStateClassName = (
  url: string,
  currentPath: string,
): string => (currentPath.slice(1) === url ? 'active' : '');
