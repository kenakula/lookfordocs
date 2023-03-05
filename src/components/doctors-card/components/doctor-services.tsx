import { getPriceString } from '@/shared/assets';
import { IDoctorService } from '@/shared/types';

interface Props {
  list: IDoctorService[];
}

export const DoctorServices = ({ list }: Props): JSX.Element => {
  return (
    <dl className="services-list">
      {list.map(({ name, price, priceFrom, value }) => (
        <div key={name} className="service">
          <dt>{value}</dt>
          <dd>{getPriceString(price, priceFrom)}</dd>
        </div>
      ))}
    </dl>
  );
};
