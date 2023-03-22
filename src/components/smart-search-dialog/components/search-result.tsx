import { LinearProgress, Typography } from '@mui/material';
import {
  ISmartSearchQuery,
  ISmartSearchResult,
  SmartSearchStatus,
} from '@/shared/types';
import { StyledSearchResult } from './styled-components';
import { ResultList } from './result-list';

const isResultEmpty = (result: ISmartSearchResult[]): boolean => {
  const arr = result.map(item => item.list).flat();

  if (arr.length === 0) {
    return true;
  }

  return false;
};

interface Props {
  searchStatus: SmartSearchStatus;
  result: ISmartSearchResult[];
  errorMessage: string;
  searchStr: string;
  handleChooseOptionCb?: (customQuery: ISmartSearchQuery) => void;
}

export const SearchResult = ({
  searchStatus,
  result,
  searchStr,
  handleChooseOptionCb,
}: Props): JSX.Element => {
  return (
    <StyledSearchResult>
      {searchStatus === 'error' && (
        <Typography
          className="search-hint search-hint--error"
          textAlign="center"
        >
          Произошла ошибка. Попробуйте позже
        </Typography>
      )}
      {searchStatus === 'idle' && (
        <Typography className="search-hint" textAlign="center">
          Начните вводить поисковый запрос
        </Typography>
      )}
      {searchStatus === 'pending' && <LinearProgress sx={{ mt: 1, mr: 4 }} />}
      {searchStatus === 'success' &&
        result.map(res => {
          if (res.list.length) {
            return (
              <ResultList
                handleChooseOptionCb={handleChooseOptionCb}
                key={res.type}
                search={searchStr}
                result={res}
              />
            );
          }
        })}

      {searchStatus === 'success' && isResultEmpty(result) ? (
        <Typography className="search-hint" textAlign="center">
          По вашему запросу ничего не найдено
        </Typography>
      ) : null}
    </StyledSearchResult>
  );
};
