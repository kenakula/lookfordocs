import { IGlobalService } from '@/shared/types';
import { GlobalServiceIcon, StyledGlobalServices } from './components';

interface Props {
  list: IGlobalService[];
}

export const GlobalServicesList = ({ list }: Props): JSX.Element | null => {
  if (!list.length) {
    return null;
  }

  return (
    <StyledGlobalServices>
      <ul>
        {list.map(({ id, name, type }) => (
          <GlobalServiceIcon key={id} name={name} type={type} />
        ))}
      </ul>
    </StyledGlobalServices>
  );
};
