import { Typography } from '@mui/material';
import { LanguagesRef } from '@/shared/types';
import { LanguageIcon, StyledLanguages } from './components';

interface Props {
  list: LanguagesRef[];
}

export const LanguagesList = ({ list }: Props): JSX.Element => {
  return (
    <StyledLanguages className="doctor-card-language">
      <Typography variant="caption">Языки</Typography>
      <ul>
        {list.map(({ languages_id: { id, name, slug } }) => (
          <li key={id}>
            <span className="icon">
              <LanguageIcon slug={slug} />
            </span>
            <span className="name">{name}</span>
          </li>
        ))}
      </ul>
    </StyledLanguages>
  );
};
