import { ImageSize } from '../enums';
import { IImage } from '../types';

const apiPublicUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? '';

const getUrlString = (url: string): string => `${apiPublicUrl}${url}`;

export const getImageUrl = (image: IImage, type?: ImageSize): string => {
  const fullImage = getUrlString(image.url);
  const mediumImage =
    image.formats &&
    image.formats.medium &&
    getUrlString(image.formats.medium.url);
  const smallImage =
    image.formats &&
    image.formats.small &&
    getUrlString(image.formats.small.url);
  const thumbImage =
    image.formats &&
    image.formats.thumbnail &&
    getUrlString(image.formats.thumbnail.url);

  if (type) {
    switch (type) {
      case ImageSize.Thumb: {
        if (thumbImage) {
          return thumbImage;
        }

        if (smallImage) {
          return smallImage;
        }

        if (mediumImage) {
          return mediumImage;
        }
      }
      case ImageSize.Small: {
        if (smallImage) {
          return smallImage;
        }

        if (mediumImage) {
          return mediumImage;
        }
      }
      case ImageSize.Medium: {
        if (mediumImage) {
          return mediumImage;
        }
      }
    }
  }

  return fullImage;
};
