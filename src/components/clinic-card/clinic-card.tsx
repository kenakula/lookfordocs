import { useCallback, useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { capitalize, CLINICS_PAGE, getImageUrl } from '@/shared/assets';
import { Breakpoints } from '@/shared/enums';
import { useGetElementHeight } from '@/shared/hooks';
import { CitiesRef, IClinic } from '@/shared/types';
import {
  GlobalServicesList,
  CardImage,
  LanguagesList,
  ServicesList,
  ButtonComponent,
  WorkTime,
} from '@/components';
import {
  ClinicCardInfo,
  ClinicCardInsurances,
  ClinicCardRating,
  StyledCardBody,
  StyledCardSubtitle,
  StyledClinicCard,
  StyledClinics,
  StyledClinicsCard,
  StyledInfo,
  StyledText,
} from './components';

interface Props {
  data: IClinic;
  rating?: number;
  detailedLocation?: boolean;
  testimonialsCount?: number;
}

export const ClinicCard = ({
  data: {
    id,
    name,
    image,
    subtitle,
    globalServices,
    lang,
    description,
    services,
    cities,
    address,
    metro,
    insurances,
    workTime,
  },
  rating,
  detailedLocation = false,
  testimonialsCount,
}: Props): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetElementHeight(cardRef);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const clinicName = useMemo(() => `Клиника: "${capitalize(name)}"`, [name]);

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

  const openRequestForm = () => {
    dispatch(openAppointmentDialog({ name, id, image, type: 'clinic' }));
  };

  return (
    <StyledClinicsCard className="clinics-card" detailedLocation={false}>
      <StyledCardBody detailedLocation={false} className="clinic-card-main">
        {!isDesktop && <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>}
        <ClinicCardInfo className="clinic-card-info">
          <div className="mobile-image-container">
            <CardImage
              name={clinicName}
              imageId={image.id}
              url={`${CLINICS_PAGE}/${id}`}
              isDetailedPage={detailedLocation}
            />
            {rating ? (
              <ClinicCardRating
                rating={rating}
                testimonialsCount={testimonialsCount}
                detaiedLocation={detailedLocation}
              />
            ) : null}
            {isDesktop && <GlobalServicesList list={globalServices} />}
          </div>
          {!isDesktop && (
            <StyledInfo>
              {detailedLocation ? (
                <Typography variant="h3">{clinicName}</Typography>
              ) : (
                <Typography variant="h3">
                  <Link href={`${CLINICS_PAGE}/${id}`}>{clinicName}</Link>
                </Typography>
              )}
              {lang && lang.length ? <LanguagesList list={lang} /> : null}
              <GlobalServicesList list={globalServices} />
            </StyledInfo>
          )}
        </ClinicCardInfo>
        <Box sx={{ flexGrow: 1 }}>
          {isDesktop && (
            <StyledInfo>
              <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>
              {detailedLocation ? (
                <Typography variant="h3">{clinicName}</Typography>
              ) : (
                <Typography variant="h3">
                  <Link href={`${CLINICS_PAGE}/${id}`}>{clinicName}</Link>
                </Typography>
              )}
              {lang && lang.length ? <LanguagesList list={lang} /> : null}
            </StyledInfo>
          )}
          <StyledText className="clinic-card-text" sx={{ mt: 2, mb: 2 }}>
            {description}
          </StyledText>
          {services && (
            <Box sx={{ mb: 2 }}>
              <ServicesList list={services} />
            </Box>
          )}
          {!detailedLocation && (
            <ButtonComponent
              text="Записаться"
              fullWidth
              variant={detailedLocation ? 'contained' : 'outlined'}
              size={detailedLocation ? 'large' : 'medium'}
              shadow
              onClick={openRequestForm}
            />
          )}
        </Box>
      </StyledCardBody>
      {!detailedLocation && (
        <StyledClinics
          maxListHeight={cardHeight}
          className="clinic-card-clinics"
        >
          <StyledClinicCard detailedLocation={detailedLocation}>
            <div className="clinic-top">
              <div className="clinic-image">
                <Image fill alt={name} src={getImageUrl(image, name)} />
              </div>
              {detailedLocation ? (
                <Typography>{clinicName}</Typography>
              ) : (
                <Link href={`/clinics/${id}`}>{clinicName}</Link>
              )}
            </div>
            <Typography variant="body2" className="clinic-address">
              {getClinicAddress(address, cities[0])}
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
            {workTime && <WorkTime data={workTime} />}
            {insurances && <ClinicCardInsurances list={insurances} />}
          </StyledClinicCard>
        </StyledClinics>
      )}
    </StyledClinicsCard>
  );
};
