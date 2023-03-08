import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { GlobalServicesRef, GlobalServiceType } from '@/shared/types';
import {
  IconHome,
  IconOnline,
  IconReceipt,
  IconFace,
} from '@/components/icons';
import { TooltipComponent } from '@/shared/assets';
import { Breakpoints } from '@/shared/enums';
import { StyledGlobalServices } from './styled-components';

interface IconProps {
  name: string;
  type: GlobalServiceType;
}

const GlobalServiceIcon = ({ type, name }: IconProps): JSX.Element => {
  const [openedTooltips, setOpenedTooltips] = useState<string[]>([]);
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

  const handleChange = (itemName: string): void => {
    setOpenedTooltips(prev => {
      if (prev.indexOf(itemName) !== -1) {
        return prev.filter(item => item !== itemName);
      }

      return [...prev, name];
    });
  };

  const handleClose = (itemName: string): void => {
    setOpenedTooltips(prev => prev.filter(item => item !== itemName));
  };

  switch (type) {
    case 'home':
      return (
        <li aria-label={name} role="presention">
          <TooltipComponent
            placement="top"
            title={name}
            open={openedTooltips.indexOf(name) !== -1}
          >
            <span
              onClick={!isTablet ? () => handleChange(name) : undefined}
              onMouseEnter={isTablet ? () => handleChange(name) : undefined}
              onMouseOut={() => handleClose(name)}
            >
              <IconHome />
            </span>
          </TooltipComponent>
        </li>
      );
    case 'online':
      return (
        <li aria-label={name}>
          <TooltipComponent
            placement="top"
            title={name}
            open={openedTooltips.indexOf(name) !== -1}
          >
            <span
              onClick={!isTablet ? () => handleChange(name) : undefined}
              onMouseEnter={isTablet ? () => handleChange(name) : undefined}
              onMouseOut={() => handleClose(name)}
            >
              <IconOnline />
            </span>
          </TooltipComponent>
        </li>
      );
    case 'receipt':
      return (
        <li aria-label={name}>
          <TooltipComponent
            placement="top"
            title={name}
            open={openedTooltips.indexOf(name) !== -1}
          >
            <span
              onClick={!isTablet ? () => handleChange(name) : undefined}
              onMouseEnter={isTablet ? () => handleChange(name) : undefined}
              onMouseOut={() => handleClose(name)}
            >
              <IconReceipt />
            </span>
          </TooltipComponent>
        </li>
      );
    default:
      return (
        <li aria-label={name}>
          <TooltipComponent
            placement="top"
            title={name}
            open={openedTooltips.indexOf(name) !== -1}
          >
            <span
              onClick={!isTablet ? () => handleChange(name) : undefined}
              onMouseEnter={isTablet ? () => handleChange(name) : undefined}
              onMouseOut={() => handleClose(name)}
            >
              <IconFace />
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
