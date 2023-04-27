import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { CLINICS_PAGE, getClinicAddress, getImageUrl } from '@/shared/assets';
import { ImageSize } from '@/shared/enums';
import { IClinic } from '@/shared/types';
import { StyledClinicCard } from './styled-components';
import { DoctorCardInsurances } from './doctor-card-insurances';

interface Props {
  clinic: IClinic;
  detailedLocation?: boolean;
}

export const DoctorCardClinic = ({
  clinic: { id, name, image, metro, insurances: insurancesList, address },
  detailedLocation = false,
}: Props): JSX.Element => {
  return (
    <StyledClinicCard detailedLocation={detailedLocation}>
      <div className="clinic-top">
        <div className="clinic-image">
          <Image fill alt={name} src={getImageUrl(image, ImageSize.Thumb)} />
        </div>
        <Link href={`${CLINICS_PAGE}/${id}`}>{name}</Link>
      </div>
      {address.map(addr => (
        <Typography key={addr.id} variant="body2" className="clinic-address">
          {getClinicAddress(addr)}
        </Typography>
      ))}
      {metro && metro.length ? (
        <ul className="clinic-metro">
          {metro.map(item => (
            <li key={item.name}>
              <Typography
                variant="caption"
                sx={{ backgroundColor: item.color.color }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
      {insurancesList.length ? (
        <DoctorCardInsurances list={insurancesList} />
      ) : null}
    </StyledClinicCard>
  );
};
