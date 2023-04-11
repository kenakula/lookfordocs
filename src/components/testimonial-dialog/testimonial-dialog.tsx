import { useMemo } from 'react';
import { FormHelperText, Typography } from '@mui/material';
import {
  ButtonComponent,
  DialogComponent,
  InputComponent,
  RatingComponent,
} from '@/components';
import { useForm } from 'react-hook-form';
import { object, number, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { setToaster, useAppDispatch, useAppSelector } from '@/stores';
import { IImage, TestimonialFormModel, TestimonialType } from '@/shared/types';
import { TestimonialModel } from '@/shared/models';
import { useMutation } from '@tanstack/react-query';
import { getImageUrl } from '@/shared/assets';
import { StyledDialogBody, StyledRatingWrapper } from './components';
import { ImageSize } from '@/shared/enums';
import { api } from '@/api';

interface Props {
  opened: boolean;
  onClose: () => void;
  type: TestimonialType;
  entityId: number;
  entityName: string;
  entityImage: IImage;
}

export const TestimonialDialog = ({
  entityImage,
  entityName,
  entityId,
  onClose,
  opened,
  type,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { testimonialsLimit } = useAppSelector(state => state.settings);

  const { isLoading, mutateAsync: saveTestimonial } = useMutation({
    mutationFn: (data: TestimonialModel) =>
      api.post<{ data: TestimonialModel }>('testimonials', {
        data: {
          ...data,
        },
      }),
  });

  const formSchema = useMemo(
    () =>
      object({
        rate: number().min(1, 'Поставьте оценку').required('Поставьте оценку'),
        name: string().required('Введите свое имя'),
        comment: string()
          .required('Введите ваше сообщение')
          .max(testimonialsLimit, 'Слишком длинное сообщение'),
      }),
    [testimonialsLimit],
  );

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState,
    clearErrors,
    reset,
  } = useForm<TestimonialFormModel>({
    defaultValues: {
      rate: 0,
      name: '',
      comment: '',
    },
    resolver: yupResolver(formSchema),
  });

  const handleRatingChange = (
    event: React.SyntheticEvent,
    value: number | null,
  ): void => {
    if (value) {
      setValue('rate', value);
      clearErrors('rate');
    }
  };

  const onSubmit = async (data: TestimonialFormModel): Promise<void> => {
    const testimonialData: TestimonialModel = {
      type,
      comment: data.comment,
      date: new Date(),
      author: data.name,
      rate: data.rate,
      doctor: undefined,
      clinic: undefined,
      insurance: undefined,
      publishedAt: null,
    };

    if (type === 'doctor') {
      testimonialData.doctor = [entityId];
    }

    if (type === 'clinic') {
      testimonialData.clinic = [entityId];
    }

    if (type === 'insurance') {
      testimonialData.insurance = [entityId];
    }

    try {
      await saveTestimonial(testimonialData);
      onClose();
      reset();
      dispatch(
        setToaster({
          message: 'Отзыв успешно отправлен. Он появится после модерации',
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
      openState={opened}
      onClose={onClose}
      title={entityName}
      imageUrl={getImageUrl(entityImage, ImageSize.Small)}
    >
      <StyledDialogBody action="#" onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          className="testimonial-dialog-field"
          formControl={control}
          id="testimonial-name"
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
        <StyledRatingWrapper>
          <Typography variant="h4">Оценка</Typography>
          <RatingComponent
            rate={watch('rate')}
            handleChange={handleRatingChange}
            interactive
          />
          {formState.errors.rate && formState.errors.rate.message ? (
            <FormHelperText>{formState.errors.rate.message}</FormHelperText>
          ) : null}
        </StyledRatingWrapper>
        <InputComponent
          className="testimonial-dialog-field"
          formControl={control}
          id="testimonial-comment"
          name="comment"
          type="text"
          multiline
          fullwidth
          label="Отзыв"
          limit={testimonialsLimit}
          disabled={isLoading}
          placeholoder="Напишите свои впечатления о приеме врача, ваш отзыв поможет другим пользователям при выборе врача или клиники"
          error={!!formState.errors.comment}
          errorMessage={
            formState.errors.comment
              ? formState.errors.comment.message
              : undefined
          }
        />
        <ButtonComponent
          variant="contained"
          text="Оставить отзыв"
          fullWidth
          type="submit"
          disabled={isLoading}
        />
      </StyledDialogBody>
    </DialogComponent>
  );
};
