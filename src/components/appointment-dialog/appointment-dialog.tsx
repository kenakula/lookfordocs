import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendRequest as sendApiRequest, nextApi } from '@/api';
import { useAppDispatch, useAppSelector } from '@/stores';
import { RNOVA_QCLINIC_ID, formatRnovaDate } from '@/shared/assets';
import { closeAppointmentDialog, setToaster } from '@/stores/slices';
import {
  ButtonComponent,
  DialogComponent,
  InputComponent,
  RadioComponent,
} from '@/components';
import { RequestFormModel, RnovaAppointmentModel } from '@/shared/models';
import { SelectedSlot } from '@/shared/types';
import { AppointmentLabel, StyledAppointmentForm } from './components';
import { formSchema, getHeaderImageUrl, getHeaderTitle } from './assets';
import { useCommentBuilder } from './hooks';

export const AppointmentDialog = (): JSX.Element => {
  const { dialogOpen, target } = useAppSelector(state => state.appointment);
  const dispatch = useAppDispatch();
  const { isLoading, mutateAsync: sendRequest } = useMutation({
    mutationFn: (data: RequestFormModel) => sendApiRequest(data),
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
      }).catch(() => {
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
    let successMessage = 'Заявка успешно отправлена. С вами скоро свяжутся';

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
      request.isTelemed = true;
      request.slot = new Date(target.slot.start);
      successMessage =
        'Вы успешно записаны на онлайн прием. Информация отправлена на указанную почту';

      await saveAppointmentToRnova(target.slot, request);
    }

    try {
      await sendRequest(request);
      closeDialog();
      reset();
      dispatch(
        setToaster({
          message: successMessage,
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
    </DialogComponent>
  );
};
