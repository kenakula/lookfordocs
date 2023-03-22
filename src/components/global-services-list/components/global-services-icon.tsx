import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { TooltipComponent } from '@/shared/assets';
import { Breakpoints } from '@/shared/enums';
import { GlobalServiceType } from '@/shared/types';
import {
  IconHome,
  IconOnline,
  IconReceipt,
  IconFace,
} from '@/components/icons';

interface IconProps {
  name: string;
  type: GlobalServiceType;
}

export const GlobalServiceIcon = ({ type, name }: IconProps): JSX.Element => {
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
        <li>
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
        <li>
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
        <li>
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
        <li>
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
