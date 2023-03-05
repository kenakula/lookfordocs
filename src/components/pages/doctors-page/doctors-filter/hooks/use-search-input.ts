/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useState, useEffect } from 'react';
import { useDebounce } from '@/shared/hooks';

interface Props {
  buildQueryCb: () => void;
}

interface UseSearchInputValue {
  debouncedSearch: string;
  searchStringValue: string;
  setSearchStringValue: (value: string) => void;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  clearInputValue: () => void;
}

export const useSearchInput = ({
  buildQueryCb,
}: Props): UseSearchInputValue => {
  const [searchStr, setSearchStr] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debouncedValue = useDebounce(searchStr, 400);

  useEffect(() => {
    setDebouncedSearch(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (isTouched) {
      buildQueryCb();
    }
  }, [debouncedSearch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isTouched) {
      setIsTouched(true);
    }

    setSearchStr(e.target.value);
  };

  const clearInput = (): void => {
    if (!isTouched) {
      setIsTouched(true);
    }

    setSearchStr('');
  };

  const setSearchStringValue = (value: string): void => {
    setSearchStr(value);
  };

  return {
    debouncedSearch,
    searchStringValue: searchStr,
    handleSearchChange,
    setSearchStringValue,
    clearInputValue: clearInput,
  };
};
