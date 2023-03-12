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
} from '@/components';
import { useForm } from 'react-hook-form';
import { object, number, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  StyledTestimonialDialog,
  StyledDialogHeader,
  StyledDialogBody,
  StyledRatingWrapper,
  StyledRating,
} from './components';
import { IconClose, IconStar } from '@/components/icons';
import { useSaveDocTestimonialMutation } from '@/stores/api';
import { setToaster, useAppDispatch, useAppSelector } from '@/stores';
import { TestimonialFormModel, TestimonialType } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { TestimonialModel } from '@/shared/models';

interface Props {
  opened: boolean;
  onClose: () => void;
  type: TestimonialType;
  entityId: number;
}

export const TestimonialDialog = ({
  opened,
  onClose,
  type,
  entityId,
}: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();
  const { testimonialsLimit } = useAppSelector(state => state.settings);

  const [saveTestimonial, { isLoading }] = useSaveDocTestimonialMutation();

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
      await saveTestimonial(testimonialData).unwrap();
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
    >
      <ContainerComponent>
        <StyledDialogHeader>
          <Typography variant="h3">Оставить отзыв о приеме</Typography>
          <IconButton onClick={onClose}>
            <IconClose id="testimonial-dialog" />
          </IconButton>
        </StyledDialogHeader>
        <StyledDialogBody action="#" onSubmit={handleSubmit(onSubmit)}>
          <StyledRatingWrapper>
            <Typography variant="h4">Оценка</Typography>
            <StyledRating
              emptyIcon={<IconStar color="inherit" />}
              icon={<IconStar color="inherit" />}
              getLabelText={value => `Оценка ${value} из 5`}
              value={watch('rate')}
              onChange={handleRatingChange}
            />
            {formState.errors.rate && formState.errors.rate.message ? (
              <FormHelperText>{formState.errors.rate.message}</FormHelperText>
            ) : null}
          </StyledRatingWrapper>
          <InputComponent
            className="testimonial-dialog-field"
            formControl={control}
            id="testimonial-name"
            name="name"
            type="text"
            fullwidth
            label="Ваше имя"
            disabled={isLoading}
            error={!!formState.errors.name}
            errorMessage={
              formState.errors.name ? formState.errors.name.message : undefined
            }
          />
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
