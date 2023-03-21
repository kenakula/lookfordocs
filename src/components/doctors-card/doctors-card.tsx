import { useMemo, useRef } from 'react';
import Link from 'next/link';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { ButtonComponent } from '@/components';
import { IDoctor } from '@/shared/types';
import { capitilizeName, DOCTORS_PAGE } from '@/shared/assets';
import { Breakpoints } from '@/shared/enums';
import { useGetCardHeight } from './hooks';
import {
  DoctorSpecialties,
  StyledDoctorsCard,
  StyledCardBody,
  StyledInfo,
  StyledText,
  StyleSevices,
  DoctorLanguages,
  DoctorCardInfo,
  DoctorServices,
  DoctorClinics,
  StyledClinics,
  DoctorGlobalServices,
  DoctorCardImage,
  DoctorCardRating,
} from './components';
import { openAppointmentDialog, useAppDispatch } from '@/stores';

interface Props {
  data: IDoctor;
  detailedLocation?: boolean;
  rating?: number;
  testimonialsCount?: number;
}

export const DoctorsCard = ({
  data: {
    firstName,
    lastName,
    specialties,
    image,
    shortText,
    id,
    lang,
    services,
    clinics,
    globalServices,
    reembolso,
  },
  detailedLocation = false,
  rating,
  testimonialsCount,
}: Props): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetCardHeight(cardRef);
  const isDesktop = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const doctorName = useMemo(
    () => capitilizeName(firstName, lastName),
    [firstName, lastName],
  );

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({ name: doctorName, id, image, type: 'doctor' }),
    );
  };

  return (
    <StyledDoctorsCard
      multipleClinics={clinics.length > 1}
      detailedLocation={detailedLocation}
    >
      <StyledCardBody
        detailedLocation={detailedLocation}
        className="doctor-card-main"
        ref={cardRef}
      >
        {!isDesktop && <DoctorSpecialties list={specialties} />}
        <DoctorCardInfo className="doctor-card-info">
          <Box className="mobile-image-container">
            <DoctorCardImage
              docID={id}
              docName={doctorName}
              imageId={image.id}
              isDetailedPage={detailedLocation}
            />
            {rating ? (
              <DoctorCardRating
                rating={rating}
                testimonialsCount={testimonialsCount}
                detaiedLocation={detailedLocation}
              />
            ) : null}
            {isDesktop && <DoctorGlobalServices list={globalServices} />}
          </Box>
          {!isDesktop && (
            <StyledInfo>
              {detailedLocation ? (
                <Typography variant="h3">{doctorName}</Typography>
              ) : (
                <Typography variant="h3">
                  <Link href={`${DOCTORS_PAGE}/${id}`}>{doctorName}</Link>
                </Typography>
              )}
              <DoctorLanguages list={lang} />
              <DoctorGlobalServices list={globalServices} />
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
              <DoctorLanguages list={lang} />
            </StyledInfo>
          )}
          <StyledText className="doctor-card-text" sx={{ mt: 2, mb: 2 }}>
            {shortText}
          </StyledText>
          {services && (
            <StyleSevices>
              <DoctorServices list={services} />
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
