import { testApi } from '@/api';
import { PartnerRequestModel } from '@/shared/models';
import { useAppDispatch, setToaster } from '@/stores';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { clinicFormSchema } from '../assets';
import { StyledPartnersForm } from './styled-components';
import { ButtonComponent } from '@/components/button-component/button-component';
import { InputComponent } from '@/components/form-components';

export interface PartnerClinicFormModel {
  clinicName: string;
  contactName: string;
  email: string;
  phone: string;
  comment: string;
}

export const ClinicsForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { control, formState, handleSubmit, reset } =
    useForm<PartnerClinicFormModel>({
      defaultValues: {
        clinicName: '',
        contactName: '',
        email: '',
        phone: '',
        comment: '',
      },
      resolver: yupResolver(clinicFormSchema),
    });

  const { isLoading, mutateAsync: sendRequest } = useMutation({
    mutationFn: (data: PartnerRequestModel) =>
      testApi.post<{ data: PartnerRequestModel }>('partner-requests', {
        data: {
          ...data,
        },
      }),
  });

  const onSubmit = (data: PartnerClinicFormModel) => {
    sendRequest({ ...data, type: 'clinic', name: data.contactName })
      .then(() => {
        dispatch(
          setToaster({
            message: 'Заявка успешно отправлена. Скоро с вами свяжутся',
            severety: 'success',
            key: new Date().getTime(),
          }),
        );
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
    reset();
  };

  return (
    <StyledPartnersForm
      className="clinics-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputComponent
        className="doctor-name-field"
        formControl={control}
        id="clinic-name"
        name="clinicName"
        type="text"
        fullwidth
        label="Название Клиники"
        placeholoder="Введите название"
        error={!!formState.errors.clinicName}
        errorMessage={
          formState.errors.clinicName
            ? formState.errors.clinicName.message
            : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        className="doctor-name-field"
        formControl={control}
        id="contact-name"
        name="contactName"
        type="text"
        fullwidth
        label="ФИО контактного лица"
        placeholoder="Введите Имя"
        error={!!formState.errors.contactName}
        errorMessage={
          formState.errors.contactName
            ? formState.errors.contactName.message
            : undefined
        }
        disabled={isLoading}
      />
      <InputComponent
        formControl={control}
        type="email"
        id="clinic-email"
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
        id="clinic-tel"
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
        id="clinic-comment"
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
