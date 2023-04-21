import { AnyObject, TestContext } from 'yup';

export const phoneNumberValidator = (
  value: string,
  context: TestContext<AnyObject>,
) => {
  const strippedValue = value.replace(/\s()/g, '').slice(1);

  if (strippedValue.length < 10) {
    return context.createError({
      message: 'Введите валидный номер телефона',
    });
  }

  return true;
};
