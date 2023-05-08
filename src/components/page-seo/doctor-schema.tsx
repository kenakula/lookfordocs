import { getImageUrl } from '@/shared/assets';
import { IDoctor } from '@/shared/types';
import Script from 'next/script';

interface Props {
  data: IDoctor;
  url: string;
}

export const DoctorSchema = ({
  data: { id, fullName, image, specialties, languages },
  url,
}: Props): JSX.Element => {
  return (
    <Script
      id={`doc-schema-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'http://schema.org/',
          '@type': 'Person',
          name: fullName,
          image: getImageUrl(image),
          url,
          jobTitle: specialties.map(item => item.name).join(', '),
          knowsLanguage: languages.map(item => item.name).join(', '),
        }),
      }}
    />
  );
};
