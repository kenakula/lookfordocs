import { Typography, List, ListItemButton, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { StyledResultList } from './styled-components';
import {
  CLINICS_PAGE,
  DOCTORS_PAGE,
  getImageUrl,
  INSURANCES_PAGE,
  SEARCH_PAGE,
} from '@/shared/assets';
import {
  ISmartSearchResult,
  ISpecialty,
  IClinic,
  IDoctor,
  IInsurance,
} from '@/shared/types';
import { closeSmartSearch, useAppDispatch } from '@/stores';

const capitilize = (str: string): string => str[0].toUpperCase() + str.slice(1);

const getHighlightedLetters = (str: string, substr: string): JSX.Element => {
  const capitilizedStr = str
    .split(' ')
    .map(word => capitilize(word))
    .join(' ');
  const startIndex = capitilizedStr.toLowerCase().indexOf(substr.toLowerCase());
  const lastIndex = startIndex + substr.length;
  const highlightedStr = capitilizedStr
    .split('')
    .splice(startIndex, substr.length)
    .join('');
  const firstPartStr = capitilizedStr.slice(0, startIndex);
  const lastPartStr = capitilizedStr.slice(lastIndex);

  return (
    <span>
      <span>{firstPartStr}</span>
      <span className="highlighted">{highlightedStr}</span>
      <span>{lastPartStr}</span>
    </span>
  );
};

interface Props {
  result: ISmartSearchResult;
  search: string;
}

export const ResultList = ({
  result: { type, list },
  search,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const closeSearchBox = (): void => {
    dispatch(closeSmartSearch({ clear: true }));
  };

  switch (type) {
    case 'specialties':
      return (
        <StyledResultList>
          <Typography variant="h3">Специализация врачей</Typography>
          <List>
            {list.map(item => {
              const { id, title, slug } = item as ISpecialty;

              return (
                <ListItemButton
                  key={`spec-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${SEARCH_PAGE}?specialty=${slug}`}
                  onClick={closeSearchBox}
                >
                  {getHighlightedLetters(title, search)}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'clinics':
      return (
        <StyledResultList>
          <Typography variant="h3">Клиники</Typography>
          <List>
            {list.map(item => {
              const { id, name, image, address } = item as IClinic;

              return (
                <ListItemButton
                  key={`clinic-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${CLINICS_PAGE}/${id}`}
                  onClick={closeSearchBox}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image.id, name, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(name, search)}
                    </Typography>
                    <Typography variant="caption">{address}</Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'docs':
      return (
        <StyledResultList>
          <Typography variant="h3">Врачи</Typography>
          <List>
            {list.map(item => {
              const { id, image, firstName, lastName, specialties } =
                item as IDoctor;

              return (
                <ListItemButton
                  key={`doctor-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${DOCTORS_PAGE}/${id}`}
                  onClick={closeSearchBox}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image.id, firstName, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(
                        `${firstName} ${lastName}`,
                        search,
                      )}
                    </Typography>
                    <Typography variant="caption">
                      {specialties
                        .map(spec => spec.specialties_id.title)
                        .join(', ')}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'insurances':
      return (
        <StyledResultList>
          <Typography variant="h3">Страховые компании</Typography>
          <List>
            {list.map(item => {
              const { id, image, name } = item as IInsurance;

              return (
                <ListItemButton
                  key={`insurance-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${INSURANCES_PAGE}/${id}`}
                  onClick={closeSearchBox}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image.id, name, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(name, search)}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
  }
};
