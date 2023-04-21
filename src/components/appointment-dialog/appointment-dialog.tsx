import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api, nextApi } from '@/api';
import { useAppDispatch, useAppSelector } from '@/stores';
import {
  RNOVA_QCLINIC_ID,
  capitalizeName,
  formatRnovaDate,
  getImageUrl,
} from '@/shared/assets';
import {
  ButtonComponent,
  DialogComponent,
  InputComponent,
  RadioComponent,
} from '@/components';
import {
  closeAppointmentDialog,
  setAppointmentDialogSuccess,
  setToaster,
} from '@/stores/slices';
import { RequestFormModel, RnovaAppointmentModel } from '@/shared/models';
import { IAppointment, SelectedSlot } from '@/shared/types';
import { ImageSize } from '@/shared/enums';
import {
  AppointmentLabel,
  StyledAppointmentForm,
  SuccessView,
} from './components';
import { formSchema } from './assets';
import { useCommentBuilder } from './hooks';

export const AppointmentDialog = (): JSX.Element => {
  const { dialogOpen, target, dialogSuccess } = useAppSelector(
    state => state.appointment,
  );
  const dispatch = useAppDispatch();
  const { isLoading, mutateAsync: sendRequest } = useMutation({
    mutationFn: (data: RequestFormModel) =>
      api.post('requests', {
        data: {
          ...data,
        },
      }),
  });

  const { isLoading: creatingAppointment, mutateAsync: createAppointment } =
    useMutation({
      mutationFn: (data: RnovaAppointmentModel) =>
        nextApi.post('create-appointment', data),
    });

  const saveAppointmentToRnova = async (
    { start, end }: SelectedSlot,
    { name, phone, email, comment }: RequestFormModel,
  ) => {
    if (target && target.doctor) {
      const timeStart = formatRnovaDate(new Date(start), true);
      const timeEnd = formatRnovaDate(new Date(end), true);
      const doctorRnovaId = target.doctor.rnovaId ? target.doctor.rnovaId : '';
      // TODO тонкий момент, как передавать айдишник клиники
      const clinicRnovaId = RNOVA_QCLINIC_ID.toString();

      createAppointment({
        timeStart,
        timeEnd,
        doctorRnovaId,
        isTelemed: true,
        clinicRnovaId,
        firstName: name,
        mobile: phone,
        comment,
        email,
      })
        .then(() => {
          reset();
          dispatch(setAppointmentDialogSuccess());
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
    }
  };

  const { handleSubmit, control, formState, reset, setValue } =
    useForm<RequestFormModel>({
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        connectionType: 'phone',
        comment: '',
        publishedAt: null,
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
      request.entityName = target.clinic.name;
    }

    if (target && target.doctor) {
      request.doctor = [target.doctor.id];
      request.entityName = target.doctor.fullName;
    }

    if (target && target.slot) {
      request.slot = target.slot;

      await saveAppointmentToRnova(target.slot, request);
    }

    try {
      await sendRequest(request);
      reset();
      dispatch(setAppointmentDialogSuccess());
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
      {dialogSuccess ? (
        <SuccessView slot={target?.slot} />
      ) : (
        <StyledAppointmentForm
          className="appointment-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          {target && target.slot ? (
            <AppointmentLabel date={new Date(target.slot.start)} />
          ) : null}
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
              !!formState.errors.name
                ? formState.errors.name.message
                : undefined
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
            name="connectionType"
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
            disabled={isLoading || creatingAppointment}
          />
        </StyledAppointmentForm>
      )}
    </DialogComponent>
  );
};
