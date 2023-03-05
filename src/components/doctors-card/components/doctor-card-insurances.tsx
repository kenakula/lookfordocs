import { Avatar, Box } from '@mui/material';
import {
  capitalize,
  getAvatarLetters,
  TooltipComponent,
} from '@/shared/assets';
import { InsurancesRef } from '@/shared/types';

interface Props {
  list: InsurancesRef[];
}

export const DoctorCardInsurances = ({ list }: Props): JSX.Element => {
  return (
    <Box className="clinic-insurances" component="ul">
      {list.map(({ insurances_id: { id, name } }) => (
        <Box component="li" key={id}>
          <TooltipComponent title={capitalize(name)} placement="top">
            <Avatar sx={{ width: 28, height: 28 }} variant="rounded">
              {getAvatarLetters(name)}
            </Avatar>
          </TooltipComponent>
        </Box>
      ))}
    </Box>
  );
};
