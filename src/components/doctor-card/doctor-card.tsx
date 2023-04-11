import { useMemo, useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import {
  ButtonComponent,
  CardImage,
  GlobalServicesList,
  LanguagesList,
  PricesList,
} from '@/components';
import { IDoctor, ITestimonial } from '@/shared/types';
import { capitalizeName, DOCTORS_PAGE, getImageUrl } from '@/shared/assets';
import { Breakpoints, ImageSize } from '@/shared/enums';
import { useGetElementHeight } from '@/shared/hooks';
import {
  DoctorSpecialties,
  StyledDoctorsCard,
  StyledCardBody,
  StyledInfo,
  StyledText,
  StyleSevices,
  DoctorCardInfo,
  DoctorClinics,
  StyledClinics,
  DoctorCardRating,
} from './components';

interface Props {
  data: IDoctor;
  testimonials?: ITestimonial[];
  detailedLocation?: boolean;
  shadowed?: boolean;
}

export const DoctorCard = ({
  data,
  detailedLocation = false,
  testimonials,
  shadowed = false,
}: Props): JSX.Element => {
  const {
    fullName,
    specialties,
    image,
    shortText,
    id,
    languages,
    prices,
    clinics,
    globalServices,
    reembolso,
  } = data;
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetElementHeight(cardRef);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const doctorName = useMemo(() => capitalizeName(fullName), [fullName]);

  const openRequestForm = () => {
    dispatch(openAppointmentDialog({ doctor: data, type: 'doctor' }));
  };

  return (
    <StyledDoctorsCard
      multipleClinics={clinics && clinics.length > 1}
      detailedLocation={detailedLocation}
      shadowed={shadowed}
      className="doctor-card"
    >
      <StyledCardBody
        detailedLocation={detailedLocation}
        className="doctor-card-main"
        ref={cardRef}
      >
        {!isDesktop && <DoctorSpecialties list={specialties} />}
        <DoctorCardInfo className="doctor-card-info">
          <div className="mobile-image-container">
            <CardImage
              name={doctorName}
              imageUrl={getImageUrl(image, ImageSize.Small)}
              url={`${DOCTORS_PAGE}/${id}`}
              isDetailedPage={detailedLocation}
            />
            {testimonials && (
              <DoctorCardRating
                testimonials={testimonials}
                detaiedLocation={detailedLocation}
              />
            )}
            {isDesktop && <GlobalServicesList list={globalServices} />}
          </div>
          {!isDesktop && (
            <StyledInfo>
              {detailedLocation ? (
                <Typography variant="h3">{doctorName}</Typography>
              ) : (
                <Typography variant="h3">
                  <Link href={`${DOCTORS_PAGE}/${id}`}>{doctorName}</Link>
                </Typography>
              )}
              <LanguagesList list={languages} />
              <GlobalServicesList list={globalServices} />
            </StyledInfo>
          )}
        </DoctorCardInfo>
        <Box sx={{ flexGrow: 1 }}>
          {isDesktop && (
            <StyledInfo>
              <DoctorSpecialties list={specialties} />
              {detailedLocation ? (
                <Typography variant="h3">{doctorName}</Typography>
              ) : (
                <Typography variant="h3">
                  <Link href={`${DOCTORS_PAGE}/${id}`}>{doctorName}</Link>
                </Typography>
              )}
              <LanguagesList list={languages} />
            </StyledInfo>
          )}
          <StyledText className="doctor-card-text" sx={{ mt: 2, mb: 2 }}>
            {shortText}
          </StyledText>
          {prices.length ? (
            <StyleSevices>
              <PricesList list={prices} />
            </StyleSevices>
          ) : null}
          {!detailedLocation && (
            <ButtonComponent
              text={detailedLocation ? 'Записаться к врачу' : 'Записаться'}
              fullWidth
              variant={detailedLocation ? 'contained' : 'outlined'}
              size={detailedLocation ? 'large' : 'medium'}
              shadow={!detailedLocation}
              onClick={openRequestForm}
            />
          )}
        </Box>
      </StyledCardBody>
      {!detailedLocation && (
        <StyledClinics maxListHeight={cardHeight} className="doctors-clinics">
          <DoctorClinics list={clinics} />
          {reembolso && (
            <Typography className="doctors-reembolso">
              Возможность получения возмещения оказанных услуг в страховой
              компании по программе reembolso
            </Typography>
          )}
        </StyledClinics>
      )}
    </StyledDoctorsCard>
  );
};
