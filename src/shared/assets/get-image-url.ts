import { IImage } from '../types';

const apiPublicUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';

export const getImageUrl = (image: IImage): string => {
  return `${apiPublicUrl}${image.url}`;
};

export const getImageThumb = (image: IImage): string => {
  if (image.formats && image.formats.thumbnail) {
    return image.formats.thumbnail.url;
  }

  return image.url;
};
