import Link from 'next/link';
import { LinearProgress, Typography } from '@mui/material';
import { StyledResultList, StyledSearchResult } from './styled-components';
import { ISmartSearchResult, SmartSearchStatus } from '@/shared/types';

interface Props {
  searchStatus: SmartSearchStatus;
  result: ISmartSearchResult | null;
  errorMessage: string;
}

const ResultContent = ({
  result,
}: {
  result: ISmartSearchResult;
}): JSX.Element => {
  if (result.specialties && result.specialties.length) {
    return (
      <StyledResultList>
        <Typography variant="h3">Специализация врачей</Typography>
        <ul>
          {result.specialties.map(spec => (
            <li key={`spec-${spec.id}`}>
              <Link
                className="search-link"
                href={{
                  pathname: '/search',
                  query: { specialty: spec.slug },
                }}
              >
                {spec.title}
              </Link>
            </li>
          ))}
        </ul>
      </StyledResultList>
    );
  }

  if (result.clinics && result.clinics.length) {
    return (
      <StyledResultList>
        <Typography>clinics</Typography>
        <ul>
          {result.clinics.map(clinic => (
            <li key={`clinic-${clinic.id}`}>{clinic.name}</li>
          ))}
        </ul>
      </StyledResultList>
    );
  }

  if (result.doctors && result.doctors.length) {
    return (
      <StyledResultList>
        <Typography>doctors</Typography>
        <ul>
          {result.doctors.map(doctor => (
            <li key={`doc-${doctor.id}`}>{doctor.firstName}</li>
          ))}
        </ul>
      </StyledResultList>
    );
  }

  if (result.insurances && result.insurances.length) {
    return (
      <StyledResultList>
        <Typography>insurances</Typography>
        <ul>
          {result.insurances.map(insurance => (
            <li key={`ins-${insurance.id}`}>{insurance.name}</li>
          ))}
        </ul>
      </StyledResultList>
    );
  }

  return (
    <Typography className="search-hint" textAlign="center">
      По вашему запросу ничего не найдено
    </Typography>
  );
};

export const SearchResult = ({ searchStatus, result }: Props): JSX.Element => {
  return (
    <StyledSearchResult>
      {searchStatus === 'error' && (
        <Typography color="error" className="search-error" textAlign="center">
          Произошла ошибка. Попробуйте позже
        </Typography>
      )}
      {searchStatus === 'idle' && (
        <Typography className="search-hint" textAlign="center">
          Начните вводить поисковый запрос
        </Typography>
      )}
      {searchStatus === 'pending' && <LinearProgress />}
      {result && <ResultContent result={result} />}
    </StyledSearchResult>
  );
};
