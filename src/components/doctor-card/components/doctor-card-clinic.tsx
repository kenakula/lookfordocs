import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { CLINICS_PAGE, getImageUrl } from '@/shared/assets';
import { IClinic } from '@/shared/types';
import { StyledClinicCard } from './styled-components';
import { DoctorCardInsurances } from './doctor-card-insurances';

interface Props {
  clinic: IClinic;
  detailedLocation?: boolean;
}

export const DoctorCardClinic = ({
  clinic: { id, name, image, metro, insurances: insurancesList },
  detailedLocation = false,
}: Props): JSX.Element => {
  // const getClinicAddress = useCallback(
  //   (addressStr?: string, city?: CitiesRef): string => {
  //     if (city && addressStr) {
  //       return `г. ${capitalize(city.cities_id.name)}, ${addressStr}`;
  //     }

  //     if (city && !address) {
  //       return `г. ${capitalize(city.cities_id.name)}`;
  //     }

  //     if (addressStr && !city) {
  //       return addressStr;
  //     }

  //     return '';
  //   },
  //   [address],
  // );

  return (
    <StyledClinicCard detailedLocation={detailedLocation}>
      <div className="clinic-top">
        <div className="clinic-image">
          <Image fill alt={name} src={getImageUrl(image)} />
        </div>
        <Link href={`${CLINICS_PAGE}/${id}`}>{name}</Link>
      </div>
      {/* <Typography variant="body2" className="clinic-address">
        {getClinicAddress(address, citiesList[0])}
      </Typography> */}
      {metro && (
        <ul className="clinic-metro">
          {metro.map(item => (
            <li key={item.slug}>
              <Typography
                variant="caption"
                sx={{ backgroundColor: item.color }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {insurancesList && <DoctorCardInsurances list={insurancesList} />}
    </StyledClinicCard>
  );
};
