import { IImage } from '../types';

export const getImageUrl = (
  id: string | IImage,
  name: string,
  params?: string,
): string => {
  const paramsString = params ? `?${params}` : '';
  const assetsUrl = process.env.NEXT_PUBLIC_ASSETS_URL ?? '';

  const imageId = typeof id === 'string' ? id : id.id;

  return `${assetsUrl}/${imageId}/${name}${paramsString}`;
};
