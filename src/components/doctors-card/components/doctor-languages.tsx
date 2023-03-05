import { Typography } from '@mui/material';
import { StyledLanguages } from './styled-components';
import { LanguageSlug, LanguagesRef } from '@/shared/types';
import { IconEn, IconPort, IconRus } from '@/components/icons';

interface IconProps {
  slug: LanguageSlug;
}

const LangIcon = ({ slug }: IconProps): JSX.Element => {
  switch (slug) {
    case 'rus':
      return <IconRus />;
    case 'en':
      return <IconEn />;
    default:
      return <IconPort />;
  }
};

interface Props {
  list: LanguagesRef[];
}

export const DoctorLanguages = ({ list }: Props): JSX.Element => {
  return (
    <StyledLanguages>
      <Typography variant="caption">Языки</Typography>
      <ul>
        {list.map(({ languages_id: { id, name, slug } }) => (
          <li key={id}>
            <span className="icon">
              <LangIcon slug={slug} />
            </span>
            <span className="name">{name}</span>
          </li>
        ))}
      </ul>
    </StyledLanguages>
  );
};
