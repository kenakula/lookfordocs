import { SelectedSlot } from '@/shared/types';
import { Typography } from '@mui/material';
import { AppointmentLabel } from './appointment-label';
import { StyledSuccessView } from './styled-components';

interface Props {
  slot?: SelectedSlot;
}

export const SuccessView = ({ slot }: Props): JSX.Element => {
  return (
    <StyledSuccessView className="success-view">
      {slot ? (
        <Typography variant="h3">
          Вы успешно записаны на онлайн прием
        </Typography>
      ) : (
        <Typography variant="h3">Заявка успешно отправлена</Typography>
      )}
      {/* TODO избавиться от бесконечного new Date для данных полученных от rnova */}
      {slot && <AppointmentLabel date={new Date(slot.start)} />}
      <div className="success-view-block">
        <Typography variant="h4">Описание</Typography>
        <Typography>В ближайшее время с вами свяжется оператор</Typography>
      </div>
    </StyledSuccessView>
  );
};
