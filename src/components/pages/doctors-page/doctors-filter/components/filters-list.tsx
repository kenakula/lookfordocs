import { Control } from 'react-hook-form';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  DoctorsFilterFormModel,
  IClinic,
} from '@/shared/types';
import { useAppSelector } from '@/stores';
import { FilterGroupComponent } from './filter-group-component';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
  handleChange: (name?: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<DoctorsFilterFormModel, any>;
  expandedBlocks: string[];
  handleExpandGroup: (id: string) => void;
}

export const FiltersList = ({
  specialties,
  services,
  insurances,
  languages,
  handleChange,
  formControl,
  expandedBlocks,
  handleExpandGroup,
  clinics,
}: Props): JSX.Element => {
  const { searchStr } = useAppSelector(state => state.smartSearch);

  return (
    <form className="filter-form" onChange={() => handleChange(searchStr)}>
      <FilterGroupComponent<ISpecialty>
        title="Специальность"
        formControl={formControl}
        id="specialty-group"
        expandedBlocks={expandedBlocks}
        handleExpandGroup={handleExpandGroup}
        list={specialties}
        name="specialties"
      />
      <FilterGroupComponent<IGlobalService>
        title="Особенности"
        formControl={formControl}
        id="services-group"
        expandedBlocks={expandedBlocks}
        handleExpandGroup={handleExpandGroup}
        list={services}
        name="services"
      />
      <FilterGroupComponent<ILanguage>
        title="Говорит на языках"
        formControl={formControl}
        id="languages-group"
        expandedBlocks={expandedBlocks}
        handleExpandGroup={handleExpandGroup}
        list={languages}
        name="languages"
      />
      <FilterGroupComponent<IInsurance>
        title="Работает со страховыми"
        formControl={formControl}
        id="insurances-group"
        expandedBlocks={expandedBlocks}
        handleExpandGroup={handleExpandGroup}
        list={insurances}
        name="insurances"
      />

      <FilterGroupComponent<IClinic>
        title="Работает в клиниках"
        formControl={formControl}
        id="clinics-group"
        expandedBlocks={expandedBlocks}
        handleExpandGroup={handleExpandGroup}
        list={clinics}
        name="clinics"
      />
    </form>
  );
};
