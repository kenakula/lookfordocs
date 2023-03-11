import Link from 'next/link';
import Image from 'next/image';
import { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { capitalize, getImageUrl } from '@/shared/assets';
import { CitiesRef, IClinic } from '@/shared/types';
import { StyledClinicCard } from './styled-components';
import { DoctorCardInsurances } from './doctor-card-insurances';

interface Props {
  clinic: IClinic;
  detailedLocation?: boolean;
}

export const DoctorCardClinic = ({
  clinic: {
    id,
    name,
    image,
    cities: citiesList,
    address,
    metro,
    insurances: insurancesList,
  },
  detailedLocation = false,
}: Props): JSX.Element => {
  const getClinicAddress = useCallback(
    (addressStr?: string, city?: CitiesRef): string => {
      if (city && addressStr) {
        return `г. ${capitalize(city.cities_id.name)}, ${addressStr}`;
      }

      if (city && !address) {
        return `г. ${capitalize(city.cities_id.name)}`;
      }

      if (addressStr && !city) {
        return addressStr;
      }

      return '';
    },
    [address],
  );

  return (
    <StyledClinicCard detailedLocation={detailedLocation}>
      <Box className="clinic-top">
        <Box className="clinic-image">
          <Image fill alt={name} src={getImageUrl(image, name)} />
        </Box>
        <Link href={`/clinics/${id}`}>{name}</Link>
      </Box>
      <Typography variant="body2" className="clinic-address">
        {getClinicAddress(address, citiesList[0])}
      </Typography>
      {metro && (
        <Box className="clinic-metro" component="ul">
          {metro.map(item => (
            <Box component="li" key={item.slug}>
              <Typography
                variant="caption"
                sx={{ backgroundColor: item.color }}
              />
              {item.name}
            </Box>
          ))}
        </Box>
      )}
      {insurancesList && <DoctorCardInsurances list={insurancesList} />}
    </StyledClinicCard>
  );
};
