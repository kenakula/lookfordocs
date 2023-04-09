import { useState } from 'react';
import { Avatar, Box, useMediaQuery } from '@mui/material';
import {
  capitalize,
  getAvatarLetters,
  TooltipComponent,
} from '@/shared/assets';
import { IInsurance } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';

interface Props {
  list: IInsurance[];
}

export const ClinicCardInsurances = ({ list }: Props): JSX.Element => {
  const [openedTooltips, setOpenedTooltips] = useState<string[]>([]);
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);

  const handleChange = (name: string): void => {
    setOpenedTooltips(prev => {
      if (prev.indexOf(name) !== -1) {
        return prev.filter(item => item !== name);
      }

      return [...prev, name];
    });
  };

  const handleClose = (name: string): void => {
    setOpenedTooltips(prev => prev.filter(item => item !== name));
  };

  return (
    <Box className="clinic-insurances" component="ul">
      {list.map(({ id, name }) => (
        <Box component="li" key={id}>
          <TooltipComponent
            title={capitalize(name)}
            placement="top"
            open={openedTooltips.indexOf(name) !== -1}
            onClick={!isTablet ? () => handleChange(name) : undefined}
            onMouseEnter={isTablet ? () => handleChange(name) : undefined}
            onMouseOut={() => handleClose(name)}
          >
            <Avatar sx={{ width: 28, height: 28 }} variant="rounded">
              {getAvatarLetters(name)}
            </Avatar>
          </TooltipComponent>
        </Box>
      ))}
    </Box>
  );
};
