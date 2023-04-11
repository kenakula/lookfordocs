import { Typography } from '@mui/material';
import { StyledCard } from './styled-components';
import { ITestimonial } from '@/shared/types';
import { ClinicHeader } from './clinic-header';
import { DoctorHeader } from './doctor-header';
import { AppHeader } from './app-header';
import { InsuranceHeader } from './insurance-header';

interface Props {
  data: ITestimonial;
}

export const TestimonialCard = ({
  data: { date, author, comment, type, doctor, clinic, insurance },
}: Props): JSX.Element => {
  const cardDate = new Date(date).toLocaleDateString('ru-RU');
  const dateTimeString = new Date(date).toISOString();

  const renderHeader = (): JSX.Element | null => {
    if (type === 'clinic' && clinic) {
      return <ClinicHeader clinic={clinic} />;
    }

    if (type === 'doctor' && doctor) {
      return <DoctorHeader doctor={doctor} />;
    }

    if (type === 'app') {
      return <AppHeader />;
    }

    if (type === 'insurance' && insurance) {
      return <InsuranceHeader insurance={insurance} />;
    }

    return null;
  };

  return (
    <StyledCard>
      {renderHeader()}
      <Typography className="card-text">{comment}</Typography>
      <div className="card-footer">
        <Typography variant="body1">{author}</Typography>
        <time dateTime={dateTimeString}>{cardDate}</time>
      </div>
    </StyledCard>
  );
};
