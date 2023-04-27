import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@/api';
import { setToaster, useAppDispatch } from '@/stores';
import { ButtonComponent, InputComponent } from '@/components';
import { PartnerRequestModel } from '@/shared/models';
import { doctorFormSchema } from '../assets';
import { StyledPartnersForm } from './styled-components';

export interface PartnerDoctorFormModel {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  comment: string;
}

export const DoctorsForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, formState, handleSubmit, reset } =
    useForm<PartnerDoctorFormModel>({
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        specialty: '',
        comment: '',
      },
      resolver: yupResolver(doctorFormSchema),
    });

  const { isLoading, mutateAsync: sendRequest } = useMutation({
    mutationFn: (data: PartnerRequestModel) =>
      api.post<{ data: PartnerRequestModel }>('partner-requests', {
        data: {
          ...data,
        },
      }),
  });

  const onSubmit = (data: PartnerDoctorFormModel) => {
    sendRequest({ ...data, type: 'doctor' })
      .then(() => {
        dispatch(
          setToaster({
            message: 'Заявка успешно отправлена. Скоро с вами свяжутся',
            severety: 'success',
            key: new Date().getTime(),
          }),
        );
        reset();
      })
      .catch(() => {
        dispatch(
          setToaster({
            message: 'Произошла ошибка, попробуйте позже',
            severety: 'error',
            key: new Date().getTime(),
          }),
        );
      });
  };

  return (
    <StyledPartnersForm
      className="doctors-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputComponent
        className="doctor-name-field"
        formControl={control}
        id="doctor-name"
        name="name"
        type="text"
        fullwidth
        label="Ваше имя"
        placeholoder="Введите ваше имя"
        error={!!formState.errors.name}
        errorMessage={
          formState.errors.name ? formState.errors.name.message : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        className="doctor-specialty-field"
        formControl={control}
        id="doctor-specialty"
        name="specialty"
        type="text"
        fullwidth
        label="Ваша специальность"
        placeholoder="Введите вашу специальность"
        error={!!formState.errors.specialty}
        errorMessage={
          formState.errors.specialty
            ? formState.errors.specialty.message
            : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        formControl={control}
        type="email"
        id="doctor-email"
        name="email"
        fullwidth
        label="E-mail"
        placeholoder="Введите e-mail"
        error={!!formState.errors.email}
        errorMessage={
          !!formState.errors.email ? formState.errors.email.message : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        formControl={control}
        type="tel"
        id="doctor-tel"
        name="phone"
        fullwidth
        label="Номер телефона"
        placeholoder="Введите номер телефона"
        error={!!formState.errors.phone}
        errorMessage={
          !!formState.errors.phone ? formState.errors.phone.message : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        formControl={control}
        type="text"
        id="doctors-comment"
        name="comment"
        fullwidth
        label="Комментарий"
        placeholoder="Введите ваш комментарий"
        multiline
        minHeight={70}
        error={!!formState.errors.comment}
        errorMessage={
          !!formState.errors.comment
            ? formState.errors.comment.message
            : undefined
        }
        disabled={isLoading}
      />
      <ButtonComponent
        text="Отправить"
        variant="contained"
        type="submit"
        disabled={isLoading}
      />
    </StyledPartnersForm>
  );
};
