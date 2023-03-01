import { useMemo, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, useMediaQuery } from '@mui/material';
import {
  DoctorSpecialties,
  StyledDoctorsCard,
  StyledCardBody,
  StyledImage,
  StyledInfo,
  StyledText,
  StyleSevices,
  DoctorLanguages,
  DoctorCardInfo,
  DoctorServices,
  DoctorClinics,
  StyledClinics,
  DoctorsCardTextsBlock,
} from './components';
import { useGetCardHeight } from './hooks';
import { ButtonComponent } from '@/components';
import { IDoctor } from '@/shared/types';
import {
  capitilizeName,
  DESKTOP_BREAKPOINT,
  DOCTORS_PAGE,
  getImageUrl,
} from '@/shared/assets';

interface Props {
  data: IDoctor;
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
  },
}: Props): JSX.Element => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { height: cardHeight } = useGetCardHeight(cardRef);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  const doctorName = useMemo(
    () => capitilizeName(firstName, lastName),
    [firstName, lastName],
  );

  return (
    <StyledDoctorsCard multipleClinics={clinics.length > 1}>
      <StyledCardBody className="doctor-card-main" ref={cardRef}>
        {!isDesktop && <DoctorSpecialties list={specialties} />}
        <DoctorCardInfo className="doctor-card-info">
          <StyledImage className="image">
            <Link href={`${DOCTORS_PAGE}/${id}`}>
              <Image
                width={120}
                height={164}
                src={getImageUrl(image.id, doctorName)}
                alt={firstName}
              />
            </Link>
          </StyledImage>
          {!isDesktop && (
            <StyledInfo>
              <Typography variant="h3">{doctorName}</Typography>
              <DoctorLanguages list={lang} />
            </StyledInfo>
          )}
        </DoctorCardInfo>
        <DoctorsCardTextsBlock>
          {isDesktop && (
            <StyledInfo>
              <DoctorSpecialties list={specialties} />
              <Typography variant="h3">{doctorName}</Typography>
              <DoctorLanguages list={lang} />
            </StyledInfo>
          )}
          <StyledText sx={{ mt: 2, mb: 2 }}>{shortText}</StyledText>
          {services && (
            <StyleSevices>
              <DoctorServices list={services} />
            </StyleSevices>
          )}
          <ButtonComponent
            text="Записаться"
            fullWidth
            variant="outlined"
            shadow
          />
        </DoctorsCardTextsBlock>
      </StyledCardBody>
      <StyledClinics maxListHeight={cardHeight} className="doctors-clinics">
        <DoctorClinics list={clinics} />
      </StyledClinics>
    </StyledDoctorsCard>
  );
};
