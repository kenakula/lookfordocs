import { SlotModel } from '@/shared/models';
import { StyledTimeTableDay } from './styled-components';
import { SelectedSlot } from '@/shared/types';

interface Props {
  slots: SlotModel[];
  onChange: (date: SelectedSlot) => void;
}

export const TimeTableDay = ({ slots, onChange }: Props): JSX.Element => {
  return (
    <StyledTimeTableDay>
      <ul className="day-slots">
        {slots.map(({ time_start, time_start_short, time_end }) => (
          <li className="day-slot" key={time_start_short}>
            <input
              id={`day-slot-${new Date(time_start).getTime()}`}
              type="radio"
              name="slot-time"
              value={new Date(time_start).getTime()}
              className="visually-hidden day-slot-input"
              onChange={() => onChange({ start: time_start, end: time_end })}
            />
            <label
              htmlFor={`day-slot-${new Date(time_start).getTime()}`}
              className="day-slot-label"
            >
              {time_start_short}
            </label>
          </li>
        ))}
      </ul>
    </StyledTimeTableDay>
  );
};
