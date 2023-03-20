import { useMemo } from 'react';
import {
  FormHelperText,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  RatingComponent,
  UserAvatar,
} from '@/components';
import { useForm } from 'react-hook-form';
import { object, number, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  StyledTestimonialDialog,
  StyledDialogHeader,
  StyledDialogBody,
  StyledRatingWrapper,
} from './components';
import { IconClose } from '@/components/icons';
import { setToaster, useAppDispatch, useAppSelector } from '@/stores';
import { IImage, TestimonialFormModel, TestimonialType } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { TestimonialModel } from '@/shared/models';
import { useMutation } from '@tanstack/react-query';
import { axiosClient } from '@/stores/assets';

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
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();
  const { testimonialsLimit } = useAppSelector(state => state.settings);

  const { isLoading, mutateAsync: saveTestimonial } = useMutation({
    mutationFn: (data: TestimonialModel) =>
      axiosClient.post('testimonials', data),
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
      targetDoctor: undefined,
      targetClinic: undefined,
      targetInsurance: undefined,
    };

    if (type === 'doctor') {
      testimonialData.targetDoctor = [{ doctors_id: entityId }];
    }

    if (type === 'clinic') {
      testimonialData.targetClinic = [{ clinics_id: entityId }];
    }

    if (type === 'insurance') {
      testimonialData.targetInsurance = [{ insurances_id: entityId }];
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
    <StyledTestimonialDialog
      open={opened}
      onClose={onClose}
      fullScreen={!isTablet}
      fullWidth
      keepMounted
    >
      <ContainerComponent>
        <StyledDialogHeader>
          <UserAvatar
            image={entityImage}
            name={entityName}
            variant={'rounded'}
          />
          <Typography variant="h3">{entityName}</Typography>
          <IconButton onClick={onClose}>
            <IconClose id="testimonial-dialog" />
          </IconButton>
        </StyledDialogHeader>
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
            multiline={7}
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
      </ContainerComponent>
    </StyledTestimonialDialog>
  );
};
