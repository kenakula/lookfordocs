import { FormControlLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { CheckboxComponent } from '@/components';
import { ClinicsFilterFormModel } from '@/shared/types';

export type ClinicsFilterCheckboxName =
  | 'specialties'
  | 'services'
  | 'insurances'
  | 'languages'
  | `specialties.${number}`
  | `services.${number}`
  | `insurances.${number}`
  | `languages.${number}`;

interface Props {
  formControl: Control<ClinicsFilterFormModel>;
  name: ClinicsFilterCheckboxName;
  value: string;
  label: string;
}

export const FilterCheckbox = ({
  name,
  value,
  formControl,
  label,
}: Props): JSX.Element => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name}
          control={formControl}
          render={({ field }) => {
            return (
              <CheckboxComponent
                {...field}
                id={`${name}-${value}`}
                value={value}
                checked={field.value === value}
                onChange={event => {
                  field.onChange(event.target.checked ? value : undefined);
                }}
              />
            );
          }}
        />
      }
    />
  );
};
