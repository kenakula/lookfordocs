import { getPriceString } from '@/shared/assets';
import { IService } from '@/shared/types';

interface Props {
  list: IService[];
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
