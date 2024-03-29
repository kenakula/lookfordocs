import { FormHelperText, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  StyledInputComponent,
  StyledInputLabel,
  StyledInputWrapper,
} from './components';

interface Props<T extends FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<T, any>;
  type: 'text' | 'email' | 'password' | 'tel';
  name: Path<T>;
  id: string;
  style?: SxProps;
  label?: string;
  multiline?: boolean;
  placeholoder?: string;
  fullwidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  limit?: number;
  minHeight?: number;
}

export const InputComponent = <T extends FieldValues>({
  errorMessage,
  placeholoder,
  formControl,
  className,
  multiline = false,
  minHeight,
  fullwidth,
  disabled,
  limit,
  error,
  label,
  style,
  type,
  name,
  id,
}: Props<T>): JSX.Element => {
  if (type === 'tel') {
    return (
      <Controller
        control={formControl}
        name={name}
        render={({ field }) => (
          <StyledInputWrapper sx={style} className={className}>
            {label && <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>}
            <PhoneInput
              country={'pt'}
              {...field}
              inputProps={{
                id,
              }}
              preferredCountries={['ru', 'pt']}
              placeholder={placeholoder}
              containerClass="phone-input"
              inputClass="phone-input__input"
              buttonClass="phone-input__btn"
              dropdownClass="phone-input__dropdown"
              defaultErrorMessage="Введите валидный номер телефона"
              onChange={(value, country, event, formattedValue) =>
                field.onChange(formattedValue)
              }
              isValid={() => {
                return error && errorMessage ? errorMessage : true;
              }}
            />
            {error && errorMessage ? (
              <FormHelperText>{errorMessage}</FormHelperText>
            ) : null}
          </StyledInputWrapper>
        )}
      />
    );
  }

  return (
    <Controller
      control={formControl}
      name={name}
      render={({ field }) => (
        <StyledInputWrapper sx={style} className={className}>
          {label && <StyledInputLabel htmlFor={id}>{label}</StyledInputLabel>}
          <StyledInputComponent
            {...field}
            id={id}
            type={type}
            color={!!error ? 'error' : undefined}
            fullWidth={fullwidth}
            multiline={multiline}
            limit={limit}
            className={multiline ? 'input-component-multiline' : undefined}
            disabled={disabled}
            placeholder={placeholoder}
            minHeight={minHeight}
          />
          {error && errorMessage ? (
            <FormHelperText>{errorMessage}</FormHelperText>
          ) : null}
        </StyledInputWrapper>
      )}
    />
  );
};
