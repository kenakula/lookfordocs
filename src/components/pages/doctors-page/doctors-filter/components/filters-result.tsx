import { FilterEmptyResult, FilterResultList } from './styled-components';
import { IDoctor } from '@/shared/types';
import { DoctorsCard } from '@/components';

interface Props {
  doctorsList: IDoctor[];
}

export const FiltersResult = ({
  doctorsList = [],
}: Props): JSX.Element | null => {
  if (doctorsList.length) {
    return (
      <FilterResultList className="filters-result">
        {doctorsList.map(item => (
          <li key={item.id}>
            <DoctorsCard data={item} />
          </li>
        ))}
      </FilterResultList>
    );
  }

  return (
    <FilterEmptyResult textAlign="center" variant="body1">
      По вашему запросу не найдено докторов. Попробуйте ослабить фильтры.
    </FilterEmptyResult>
  );
};
