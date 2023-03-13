import { FormHelperText, SxProps } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import {
  StyledInputComponent,
  StyledInputLabel,
  StyledInputWrapper,
} from './components';

interface Props<T extends FieldValues> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl: Control<T, any>;
  type: 'text' | 'email' | 'password';
  name: Path<T>;
  id: string;
  style?: SxProps;
  label?: string;
  multiline?: number;
  placeholoder?: string;
  fullwidth?: boolean;
  error?: boolean;
  errorMessage?: string;
  className?: string;
  disabled?: boolean;
  limit?: number;
}

export const InputComponent = <T extends FieldValues>({
  errorMessage,
  formControl,
  className,
  multiline,
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
            multiline={!!multiline}
            limit={limit}
            className={multiline ? 'input-component-multiline' : undefined}
            disabled={disabled}
          />
          {error && errorMessage ? (
            <FormHelperText>{errorMessage}</FormHelperText>
          ) : null}
        </StyledInputWrapper>
      )}
    />
  );
};
