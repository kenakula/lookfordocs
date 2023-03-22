import { IconRus, IconEn, IconPort } from '@/components/icons';
import { LanguageSlug } from '@/shared/types';

interface Props {
  slug: LanguageSlug;
}

export const LanguageIcon = ({ slug }: Props): JSX.Element => {
  switch (slug) {
    case 'rus':
      return <IconRus />;
    case 'en':
      return <IconEn />;
    default:
      return <IconPort />;
  }
};
