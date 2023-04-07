import { useMemo, useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import {
  ButtonComponent,
  CardImage,
  GlobalServicesList,
  LanguagesList,
  ServicesList,
} from '@/components';
import { IDoctor } from '@/shared/types';
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
  detailedLocation?: boolean;
  rating?: number;
  shadowed?: boolean;
}

export const DoctorCard = ({
  data: {
    fullName,
    specialties,
    image,
    shortText,
    id,
    languages,
    services,
    clinics,
    global_services,
    reembolso,
    testimonials,
  },
  detailedLocation = false,
  shadowed = false,
  rating,
}: Props): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetElementHeight(cardRef);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const doctorName = useMemo(() => capitalizeName(fullName), [fullName]);

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({ name: doctorName, id, image, type: 'doctor' }),
    );
  };

  return (
    <StyledDoctorsCard
      multipleClinics={clinics.length > 1}
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
            {rating ? (
              <DoctorCardRating
                rating={rating}
                testimonialsCount={testimonials.length}
                detaiedLocation={detailedLocation}
              />
            ) : null}
            {isDesktop && <GlobalServicesList list={global_services} />}
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
              <GlobalServicesList list={global_services} />
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
          {services && (
            <StyleSevices>
              <ServicesList list={services} />
            </StyleSevices>
          )}
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
