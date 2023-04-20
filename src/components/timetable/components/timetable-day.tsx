import { SlotModel } from '@/shared/models';
import { getDayHeader } from '../assets';
import { StyledTimeTableDay } from './styled-components';
import { Typography } from '@mui/material';

interface Props {
  date: Date;
  slots: SlotModel[];
}

export const TimeTableDay = ({ date, slots }: Props): JSX.Element => {
  return (
    <StyledTimeTableDay>
      <ul className="day-slots">
        {slots.map(item => (
          <li className="day-slot" key={item.time_start_short}>
            <label
              htmlFor={`day-slot-${item.time_start_short}`}
              className="day-slot"
            >
              <input
                id={`day-slot-${item.time_start_short}`}
                type="radio"
                name="slot-time"
                value={item.time_start_short}
                className="visually-hidden"
              />
              {item.time_start_short}
            </label>
          </li>
        ))}
      </ul>
    </StyledTimeTableDay>
  );
};
