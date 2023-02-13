export const getImageUrl = (id: string, name: string): string => {
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';

  return `${assetsUrl}/${id}/${name}`;
};
