import { object, string } from 'yup';

export const formSchema = object({
  name: string().required('Введите ваше имя'),
  email: string()
    .email('Введите корректный email')
    .required('Введите ваш email'),
  phone: string()
    .required('Введите ваш номер телефона')
    .test({
      name: 'test phone number',
      test: (value, context) => {
        const strippedValue = value.replace(/\s()/g, '').slice(1);

        if (strippedValue.length < 10) {
          return context.createError({
            message: 'Введите валидный номер телефона',
          });
        }

        return true;
      },
    }),
  connectionType: string().required(),
  comment: string().required('Введите сообщение'),
});
