import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { IDoctorEducation } from '@/shared/types';
import { StyledDoctorEducationItem } from './styled-components';

interface Props {
  data: IDoctorEducation[];
}

export const DetailedDoctorEducation = ({ data }: Props): JSX.Element => {
  const getEducationDescriptionElements = (
    list: [string, string],
  ): JSX.Element[] => list.map(item => <span key={item}>{item}</span>);

  return (
    <Timeline className="doctor-education-timeline">
      {data.map(({ startYear, endYear, type, specialty, text }, index) => (
        <TimelineItem key={`${startYear}-${index}`} className="timeline-item">
          <TimelineSeparator>
            <TimelineDot />
            {index < data.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <StyledDoctorEducationItem>
              <Typography variant="caption" className="doctor-education-year">
                {endYear ?? 'по н.в.'}
              </Typography>
              <Box className="doctor-education-info">
                <Typography className="doctor-education-text">
                  {text}
                </Typography>
                <Typography className="doctor-education-description">
                  {getEducationDescriptionElements([type, specialty])}
                </Typography>
              </Box>
            </StyledDoctorEducationItem>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
