import Image from 'next/image';
import { ILanguage } from '@/shared/types';
import { getImageUrl } from '@/shared/assets';
import { StyledLanguages } from './components';

interface Props {
  list: ILanguage[];
}

export const LanguagesList = ({ list }: Props): JSX.Element => {
  return (
    <StyledLanguages className="card-languages">
      <ul>
        <li>
          <span className="name">Языки</span>
        </li>
        {list.map(({ id, name, icon }) => (
          <li key={id}>
            <span className="icon">
              <Image src={getImageUrl(icon)} width={16} height={16} alt="" />
            </span>
            <span className="name">{name}</span>
          </li>
        ))}
      </ul>
    </StyledLanguages>
  );
};
