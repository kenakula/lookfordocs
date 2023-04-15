/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api, getDoctorSlots, getTelemedDoctors } from '@/api';
import { useAppDispatch, useAppSelector } from '@/stores';
import { capitalizeName, getImageUrl } from '@/shared/assets';
import {
  ButtonComponent,
  DialogComponent,
  InputComponent,
  RadioComponent,
} from '@/components';
import { closeAppointmentDialog, setToaster } from '@/stores/slices';
import { RequestFormModel } from '@/shared/models';
import { IAppointment } from '@/shared/types';
import { ImageSize } from '@/shared/enums';
import { StyledAppointmentForm } from './components';
import { formSchema } from './assets';
import { useCommentBuilder } from './hooks';

export const AppointmentDialog = (): JSX.Element => {
  const { dialogOpen, target } = useAppSelector(state => state.appointment);
  const dispatch = useAppDispatch();
  const { isLoading, mutateAsync: sendRequest } = useMutation({
    mutationFn: (data: RequestFormModel) =>
      api.post('requests', {
        data: {
          ...data,
        },
      }),
  });

  const { data: doctorsData, isLoading: isDoctorsLoading } = useQuery(
    ['getSlots', dialogOpen],
    {
      queryFn: getTelemedDoctors,
      enabled: dialogOpen && !target,
      staleTime: 10000,
    },
  );

  const { data: scheduleData } = useQuery(
    ['getSchedule', target?.doctor?.rnovaId],
    {
      queryFn: () => getDoctorSlots(target?.doctor?.rnovaId),
      enabled:
        dialogOpen && !!target && !!target.doctor && !!target.doctor.rnovaId,
      staleTime: 10000,
    },
  );

  const { handleSubmit, control, formState, reset, setValue } =
    useForm<RequestFormModel>({
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        connectType: 'phone',
        comment: '',
      },
      resolver: yupResolver(formSchema),
    });

  useCommentBuilder(target, setValue);

  const onSubmit = async (data: RequestFormModel) => {
    const request: RequestFormModel = {
      ...data,
      date: new Date(),
    };

    if (target && target.clinic) {
      request.clinic = [target.clinic.id];
    }

    if (target && target.doctor) {
      request.doctor = [target.doctor.id];
    }

    try {
      await sendRequest(request);
      reset();
      dispatch(closeAppointmentDialog());
      dispatch(
        setToaster({
          message: 'Заявка успешно отправлена. Скоро с вами свяжутся',
          severety: 'success',
          key: new Date().getTime(),
        }),
      );
    } catch (error) {
      dispatch(
        setToaster({
          message: 'Произошла ошибка, попробуйте позже',
          severety: 'error',
          key: new Date().getTime(),
        }),
      );
    }
  };

  const closeDialog = () => {
    dispatch(closeAppointmentDialog());
  };

  const getHeaderTitle = (appointmentType: IAppointment | null): string => {
    if (appointmentType && appointmentType.clinic) {
      return capitalizeName(appointmentType.clinic.name);
    }

    if (appointmentType && appointmentType.doctor) {
      return capitalizeName(appointmentType.doctor.fullName);
    }

    return 'Заполните данные';
  };

  const getHeaderImageUrl = (
    appointmentType: IAppointment | null,
  ): string | undefined => {
    if (appointmentType && appointmentType.clinic) {
      return getImageUrl(appointmentType.clinic.image, ImageSize.Thumb);
    }

    if (appointmentType && appointmentType.doctor) {
      return getImageUrl(appointmentType.doctor.image, ImageSize.Thumb);
    }

    return undefined;
  };

  return (
    <DialogComponent
      openState={dialogOpen}
      onClose={closeDialog}
      title={getHeaderTitle(target)}
      imageUrl={getHeaderImageUrl(target)}
    >
      <StyledAppointmentForm
        className="appointment-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputComponent
          formControl={control}
          type="text"
          id="appointment-name"
          name="name"
          fullwidth
          label="Ваше имя"
          placeholoder="Введите ваше имя"
          error={!!formState.errors.name}
          errorMessage={
            !!formState.errors.name ? formState.errors.name.message : undefined
          }
          disabled={isLoading}
        />
        <InputComponent
          formControl={control}
          type="email"
          id="appointment-email"
          name="email"
          fullwidth
          label="E-mail"
          placeholoder="Введите e-mail"
          error={!!formState.errors.email}
          errorMessage={
            !!formState.errors.email
              ? formState.errors.email.message
              : undefined
          }
          disabled={isLoading}
        />
        <InputComponent
          formControl={control}
          type="tel"
          id="appointment-tel"
          name="phone"
          fullwidth
          label="Номер телефона"
          placeholoder="Введите номер телефона"
          error={!!formState.errors.phone}
          errorMessage={
            !!formState.errors.phone
              ? formState.errors.phone.message
              : undefined
          }
          disabled={isLoading}
        />
        <RadioComponent
          name="connectType"
          formControl={control}
          id="appointment-contact-type"
          label="Предпочитаемый способ для связи"
          options={[
            {
              value: 'phone',
              label: 'По телефону',
            },
            {
              value: 'watsapp',
              label: 'WhatsApp',
            },
            {
              value: 'telegram',
              label: 'Telegram',
            },
          ]}
          disabled={isLoading}
        />
        <InputComponent
          formControl={control}
          type="text"
          id="appointment-comment"
          name="comment"
          fullwidth
          label="Комментарий"
          placeholoder="К какому специалисту вы хотели бы записаться"
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
          variant="contained"
          text="Отправить заявку"
          fullWidth
          type="submit"
          disabled={isLoading}
        />
      </StyledAppointmentForm>
    </DialogComponent>
  );
};
