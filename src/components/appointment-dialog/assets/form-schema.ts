import { phoneNumberValidator } from '@/shared/assets';
import { object, string } from 'yup';

export const formSchema = object({
  name: string().required('Введите ваше имя'),
  email: string()
    .email('Введите корректный email')
    .required('Введите ваш email'),
  phone: string().required('Введите ваш номер телефона').test({
    name: 'test phone number',
    test: phoneNumberValidator,
  }),
  connectionType: string().required(),
  comment: string().required('Введите сообщение'),
});
