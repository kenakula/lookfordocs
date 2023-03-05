import { Box, Typography } from '@mui/material';
import { StyledCard } from './styled-components';
import { ClinicHeader } from './clinic-header';
import { DoctorHeader } from './doctor-header';
import { AppHeader } from './app-header';
import { InsuranceHeader } from './insurance-header';
import { ITestimonial } from '@/shared/types';

interface Props {
  data: ITestimonial;
}

export const TestimonialCard = ({
  data: {
    date,
    author,
    comment,
    targetDoctor,
    targetClinic,
    targetInsurance,
    type,
    specialty,
    city,
  },
}: Props): JSX.Element => {
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  const renderHeader = (): JSX.Element | null => {
    if (type === 'clinic' && targetClinic && city) {
      return (
        <ClinicHeader
          city={city[0].cities_id}
          clinic={targetClinic[0].clinics_id}
        />
      );
    }

    if (type === 'doctor' && targetDoctor && specialty) {
      return (
        <DoctorHeader
          doctor={targetDoctor[0].doctors_id}
          specialty={specialty}
        />
      );
    }

    if (type === 'app') {
      return <AppHeader />;
    }

    if (type === 'insurance' && targetInsurance) {
      return <InsuranceHeader insurance={targetInsurance[0].insurances_id} />;
    }

    return null;
  };

  return (
    <StyledCard>
      {renderHeader()}
      <Typography className="card-text">{comment}</Typography>
      <Box className="card-footer">
        <Typography variant="body1">{author}</Typography>
        <time dateTime={dateTimeString}>{cardDate}</time>
      </Box>
    </StyledCard>
  );
};
