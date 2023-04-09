import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@mui/material';
import { WorkTime } from '@/components';
import { capitalizeName, CLINICS_PAGE, getImageUrl } from '@/shared/assets';
import { IClinic } from '@/shared/types';
import { ImageSize } from '@/shared/enums';
import { StyledClinicCard } from './styled-components';
import { ClinicCardInsurances } from './clinic-card-insurances';

interface Props {
  data: IClinic;
  clinicName: string;
  detailedLocation?: boolean;
}

export const ClinicCardAside = ({
  data: { id, name, image, metro, address, worktime, reembolso, insurances },
  detailedLocation = false,
  clinicName,
}: Props): JSX.Element => {
  return (
    <StyledClinicCard detailedLocation={detailedLocation}>
      <div className="clinic-top">
        <div className="clinic-image">
          <Image fill alt={name} src={getImageUrl(image, ImageSize.Thumb)} />
        </div>
        {detailedLocation ? (
          <Typography>{clinicName}</Typography>
        ) : (
          <Link href={`${CLINICS_PAGE}/${id}`}>{clinicName}</Link>
        )}
      </div>
      {address.map(addr => (
        <Typography key={addr.id} variant="body2" className="clinic-address">
          {/* TODO вынести в ассетс (повторяется в карточке клиники) */}
          {`г. ${capitalizeName(addr.city.name)}, ${addr.address}`}
        </Typography>
      ))}
      {metro && (
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
      )}
      {worktime.length ? <WorkTime data={worktime} /> : null}
      {insurances.length ? <ClinicCardInsurances list={insurances} /> : null}
      {reembolso && (
        <Typography className="clinics-reembolso">
          Есть возможность получения возмещения оказанных услуг в страховой
          компании по программе reembolso
        </Typography>
      )}
    </StyledClinicCard>
  );
};
