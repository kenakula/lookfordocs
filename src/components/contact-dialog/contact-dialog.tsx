import { useMemo } from 'react';
import { styled } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { object, string } from 'yup';
import { api } from '@/api';
import {
  setToaster,
  toggleContactDialog,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { ContactFormModel } from '@/shared/types';
import { DialogComponent } from '../dialog-component/dialog-component';
import { ButtonComponent } from '../button-component/button-component';
import { InputComponent } from '../form-components';

const StyledDialogBody = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(4),

  [theme.breakpoints.up('lmd')]: {
    rowGap: theme.spacing(2),
  },
}));

export const ContactDialog = (): JSX.Element => {
  const { contactDialogOpen } = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const closeDialog = () => {
    dispatch(toggleContactDialog(false));
  };

  const { isLoading, mutateAsync: sendFeedback } = useMutation({
    mutationFn: (data: ContactFormModel) =>
      api.post<{ data: ContactFormModel }>('feedbacks', {
        data,
      }),
  });

  const formSchema = useMemo(
    () =>
      object({
        name: string().required('Введите свое имя'),
        email: string()
          .email('Введите корректный адрес почты')
          .required('Введите вашу почту'),
        comment: string().required('Введите ваше сообщение'),
      }),
    [],
  );

  const { control, handleSubmit, formState, reset } = useForm<ContactFormModel>(
    {
      defaultValues: {
        name: '',
        email: '',
        comment: '',
      },
      resolver: yupResolver(formSchema),
    },
  );

  const onSubmit = async (data: ContactFormModel) => {
    try {
      await sendFeedback(data);
      dispatch(toggleContactDialog(false));
      reset();
      dispatch(
        setToaster({
          message: 'Форма успешна отправлена',
          severety: 'success',
          key: new Date().getTime(),
        }),
      );
    } catch (err) {
      dispatch(
        setToaster({
          message: 'Произошла ошибка, попробуйте позже',
          severety: 'error',
          key: new Date().getTime(),
        }),
      );
    }
  };

  return (
    <DialogComponent
      openState={contactDialogOpen}
      onClose={closeDialog}
      title="Заполните форму обратной связи"
    >
      <StyledDialogBody onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          className="contact-dialog-field"
          formControl={control}
          id="contact-name"
          name="name"
          type="text"
          fullwidth
          label="Ваше имя"
          placeholoder="Введите ваше имя"
          disabled={isLoading}
          error={!!formState.errors.name}
          errorMessage={
            formState.errors.name ? formState.errors.name.message : undefined
          }
        />
        <InputComponent
          className="contact-dialog-field"
          formControl={control}
          id="contact-email"
          name="email"
          type="email"
          fullwidth
          label="Ваша почта"
          placeholoder="Введите ваш e-mail"
          disabled={isLoading}
          error={!!formState.errors.email}
          errorMessage={
            formState.errors.email ? formState.errors.email.message : undefined
          }
        />
        <InputComponent
          className="contact-dialog-field"
          formControl={control}
          id="contact-comment"
          name="comment"
          type="text"
          multiline
          fullwidth
          label="Сообщение"
          disabled={isLoading}
          placeholoder="Напишите ваше сообщение"
          error={!!formState.errors.comment}
          errorMessage={
            formState.errors.comment
              ? formState.errors.comment.message
              : undefined
          }
        />
        <ButtonComponent
          variant="contained"
          text="Отправить форму"
          fullWidth
          type="submit"
          disabled={isLoading}
        />
      </StyledDialogBody>
    </DialogComponent>
  );
};
