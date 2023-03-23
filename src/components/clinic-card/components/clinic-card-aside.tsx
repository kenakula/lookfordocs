import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { capitalize, CLINICS_PAGE, getImageUrl } from '@/shared/assets';
import { CitiesRef, IClinic } from '@/shared/types';
import { StyledClinicCard } from './styled-components';
import { WorkTime } from '@/components';
import { ClinicCardInsurances } from './clinic-card-insurances';
import { useCallback } from 'react';

interface Props {
  data: IClinic;
  clinicName: string;
  detailedLocation?: boolean;
}

export const ClinicCardAside = ({
  data: {
    image,
    name,
    id,
    metro,
    worktime,
    insurances,
    address,
    cities,
    reembolso,
  },
  detailedLocation = false,
  clinicName,
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
      <div className="clinic-top">
        <div className="clinic-image">
          <Image fill alt={name} src={getImageUrl(image, clinicName)} />
        </div>
        {detailedLocation ? (
          <Typography>{clinicName}</Typography>
        ) : (
          <Link href={`${CLINICS_PAGE}/${id}`}>{clinicName}</Link>
        )}
      </div>
      {cities && (
        <Typography variant="body2" className="clinic-address">
          {getClinicAddress(address, cities[0])}
        </Typography>
      )}
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
      {worktime && <WorkTime data={worktime} />}
      {insurances && <ClinicCardInsurances list={insurances} />}
      {reembolso && (
        <Typography className="clinics-reembolso">
          Есть возможность получения возмещения оказанных услуг в страховой
          компании по программе reembolso
        </Typography>
      )}
    </StyledClinicCard>
  );
};
