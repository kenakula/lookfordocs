import { SelectedSlot } from '@/shared/types';

interface Props {
  slot?: SelectedSlot;
}

export const SuccessView = ({ slot }: Props): JSX.Element => {
  return (
    <div className="success-view">
      <h2>Вы успешно записаны к врачу на онлайн прием</h2>
      <p>{JSON.stringify(slot)}</p>
    </div>
  );
};
