import { StyledGlobalServices } from './styled-components';
import { GlobalServicesRef, GlobalServiceType } from '@/shared/types';
import {
  IconEmail,
  IconHome,
  IconOnline,
  IconReceipt,
} from '@/components/icons';
import { TooltipComponent } from '@/shared/assets';

interface IconProps {
  name: string;
  type: GlobalServiceType;
}

const GlobalServiceIcon = ({ type, name }: IconProps): JSX.Element => {
  switch (type) {
    case 'home':
      return (
        <li aria-label={name}>
          <TooltipComponent placement="top" title={name}>
            <span>
              <IconHome />
            </span>
          </TooltipComponent>
        </li>
      );
    case 'online':
      return (
        <li aria-label={name}>
          <TooltipComponent placement="top" title={name}>
            <span>
              <IconOnline />
            </span>
          </TooltipComponent>
        </li>
      );
    case 'receipt':
      return (
        <li aria-label={name}>
          <TooltipComponent placement="top" title={name}>
            <span>
              <IconReceipt />
            </span>
          </TooltipComponent>
        </li>
      );
    default:
      return (
        <li aria-label={name}>
          <TooltipComponent placement="top" title={name}>
            <span>
              <IconEmail />
            </span>
          </TooltipComponent>
        </li>
      );
  }
};

interface Props {
  list: GlobalServicesRef[];
}

export const DoctorGlobalServices = ({ list }: Props): JSX.Element | null => {
  if (!list.length) {
    return null;
  }

  return (
    <StyledGlobalServices>
      <ul>
        {list.map(({ globalServices_id: { id, name, type } }) => (
          <GlobalServiceIcon key={id} name={name} type={type} />
        ))}
      </ul>
    </StyledGlobalServices>
  );
};
