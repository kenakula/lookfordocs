import Image from 'next/image';
import { Box } from '@mui/material';
import { getImageUrl, TooltipComponent } from '@/shared/assets';
import { InsurancesRef } from '@/shared/types';

interface Props {
  list: InsurancesRef[];
}

export const DoctorCardInsurances = ({ list }: Props): JSX.Element => {
  return (
    <Box className="clinic-insurances" component="ul">
      {list.map(({ insurances_id: { id, name, image } }) => (
        <Box component="li" key={id}>
          <TooltipComponent title={name} placement="top">
            <Image
              width={56}
              height={56}
              alt={name}
              src={getImageUrl(image.id, name, 'width=56&height=56')}
            />
          </TooltipComponent>
        </Box>
      ))}
    </Box>
  );
};
