import { phoneNumberValidator } from '@/shared/assets';
import { object, string } from 'yup';

export const doctorFormSchema = object({
  name: string().required('Введите ваше имя'),
  email: string()
    .email('Введите корректно почту')
    .required('Введите вашу почту'),
  phone: string().required('Введите ваш номер телефона').test({
    name: 'test phone number',
    test: phoneNumberValidator,
  }),
  specialty: string().required('Введите ваши специальность'),
  comment: string().required('Введите ваш комментарий'),
});

export const clinicFormSchema = object({
  clinicName: string().required('Введите название клиники'),
  contactName: string().required('Введите имя контактного лица'),
  email: string()
    .email('Введите корректно почту')
    .required('Введите вашу почту'),
  phone: string().required('Введите ваш номер телефона').test({
    name: 'test phone number',
    test: phoneNumberValidator,
  }),
  comment: string().required('Введите ваш комментарий'),
});
