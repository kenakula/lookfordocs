import { Box, Typography } from '@mui/material';
import { ISmartSearchResult, SmartSearchStatus } from '@/shared/types';

interface Props {
  searchStatus: SmartSearchStatus;
  result: ISmartSearchResult | null;
  errorMessage: string;
}

const ResultBox = ({ result }: { result: ISmartSearchResult }): JSX.Element => {
  if (result.specialties && result.specialties.length) {
    return (
      <Box>
        <Typography>specialties</Typography>
        <ul>
          {result.specialties.map(spec => (
            <li key={`spec-${spec.id}`}>{spec.title}</li>
          ))}
        </ul>
      </Box>
    );
  }

  if (result.clinics && result.clinics.length) {
    return (
      <Box>
        <Typography>clinics</Typography>
        <ul>
          {result.clinics.map(clinic => (
            <li key={`clinic-${clinic.id}`}>{clinic.name}</li>
          ))}
        </ul>
      </Box>
    );
  }

  if (result.doctors && result.doctors.length) {
    return (
      <Box>
        <Typography>doctors</Typography>
        <ul>
          {result.doctors.map(doctor => (
            <li key={`doc-${doctor.id}`}>{doctor.firstName}</li>
          ))}
        </ul>
      </Box>
    );
  }

  if (result.insurances && result.insurances.length) {
    return (
      <Box>
        <Typography>insurances</Typography>
        <ul>
          {result.insurances.map(insurance => (
            <li key={`ins-${insurance.id}`}>{insurance.name}</li>
          ))}
        </ul>
      </Box>
    );
  }

  return <Typography>nothing found</Typography>;
};

export const SearchResult = ({ searchStatus, result }: Props): JSX.Element => {
  return (
    <Box>
      {searchStatus === 'idle' && (
        <Typography variant="caption">
          Начните вводить поисковый запрос ...
        </Typography>
      )}
      {searchStatus === 'pending' && <p>loading ...</p>}
      {result && <ResultBox result={result} />}
    </Box>
  );
};
