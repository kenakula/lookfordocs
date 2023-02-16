export const getImageUrl = (
  id: string,
  name: string,
  params?: string,
): string => {
  const paramsString = params ? `?${params}` : '';
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';

  return `${assetsUrl}/${id}/${name}${paramsString}`;
};
