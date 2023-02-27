import { Box } from '@mui/material';
import { Control } from 'react-hook-form';
import { FilterGroupComponent } from './filter-group-component';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  FilterFormModel,
} from '@/shared/types';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  handleChange?: () => void;
  handleSubmit?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<FilterFormModel, any>;
  expandedBlocks: string[];
  handleExpandGroup: (id: string) => void;
}

export const FiltersList = ({
  specialties,
  services,
  insurances,
  languages,
  handleChange,
  handleSubmit,
  formControl,
  expandedBlocks,
  handleExpandGroup,
}: Props): JSX.Element => {
  return (
    <Box
      component="form"
      className="filter-form"
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      {specialties && (
        <FilterGroupComponent<ISpecialty>
          title="Специальность"
          formControl={formControl}
          id="specialty-group"
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
          list={specialties}
          name="specialties"
        />
      )}
      {services && (
        <FilterGroupComponent<IGlobalService>
          title="Особенности"
          formControl={formControl}
          id="services-group"
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
          list={services}
          name="services"
        />
      )}
      {insurances && (
        <FilterGroupComponent<IInsurance>
          title="Работает со страховыми"
          formControl={formControl}
          id="insurances-group"
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
          list={insurances}
          name="insurances"
        />
      )}
      {languages && (
        <FilterGroupComponent<ILanguage>
          title="Говорит на языках"
          formControl={formControl}
          id="languages-group"
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
          list={languages}
          name="languages"
        />
      )}
    </Box>
  );
};
