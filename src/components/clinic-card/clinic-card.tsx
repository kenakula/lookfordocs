import { useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { capitalize, CLINICS_PAGE, getImageUrl } from '@/shared/assets';
import { Breakpoints, ImageSize } from '@/shared/enums';
import { useGetElementHeight } from '@/shared/hooks';
import { IClinic, ITestimonial } from '@/shared/types';
import {
  GlobalServicesList,
  CardImage,
  LanguagesList,
  PricesList,
  ButtonComponent,
} from '@/components';
import {
  ClinicCardAside,
  ClinicCardInfo,
  ClinicCardRating,
  StyledCardBody,
  StyledCardSubtitle,
  StyledClinics,
  StyledClinicsCard,
  StyledInfo,
  StyledText,
} from './components';

interface Props {
  data: IClinic;
  detailedLocation?: boolean;
  testimonials?: ITestimonial[];
}

export const ClinicCard = ({
  data,
  testimonials,
  detailedLocation = false,
}: Props): JSX.Element => {
  const {
    id,
    name,
    image,
    prices,
    subtitle,
    languages,
    description,
    globalServices,
  } = data;
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetElementHeight(cardRef);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const clinicName = `Клиника: "${capitalize(name)}"`;

  const openRequestForm = () => {
    dispatch(openAppointmentDialog({ clinic: data, type: 'clinic' }));
  };

  return (
    <StyledClinicsCard
      className="clinics-card"
      detailedLocation={detailedLocation}
    >
      <StyledCardBody
        detailedLocation={detailedLocation}
        className="clinic-card-main"
      >
        {!isDesktop && <StyledCardSubtitle>{subtitle}</StyledCardSubtitle>}
        <ClinicCardInfo className="clinic-card-info">
          <div className="mobile-image-container">
            <CardImage
              isClinic
              name={clinicName}
              imageUrl={getImageUrl(image, ImageSize.Small)}
              url={`${CLINICS_PAGE}/${id}`}
              isDetailedPage={detailedLocation}
            />
            {testimonials && (
              <ClinicCardRating
                testimonials={testimonials}
                detaiedLocation={detailedLocation}
              />
            )}
            {isDesktop && globalServices ? (
              <GlobalServicesList list={globalServices} />
            ) : null}
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
              {languages.length ? <LanguagesList list={languages} /> : null}
              {globalServices && <GlobalServicesList list={globalServices} />}
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
              {languages.length ? <LanguagesList list={languages} /> : null}
            </StyledInfo>
          )}
          <StyledText className="clinic-card-text" sx={{ my: 2 }}>
            {description}
          </StyledText>
          {prices.length ? (
            <Box sx={{ mb: 2 }}>
              <PricesList list={prices} />
            </Box>
          ) : null}
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
          <ClinicCardAside data={data} clinicName={name} />
        </StyledClinics>
      )}
    </StyledClinicsCard>
  );
};
