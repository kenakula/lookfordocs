import { Typography, List, ListItemButton, Avatar } from '@mui/material';
import Link from 'next/link';
import { closeSmartSearch, useAppDispatch, useAppSelector } from '@/stores';
import {
  getImageUrl,
  DOCTORS_PAGE,
  getHighlightedLetters,
  CLINICS_PAGE,
  HOME_PAGE,
} from '@/shared/assets';
import {
  ISmartSearchResult,
  ISpecialty,
  IClinic,
  IDoctor,
  IInsurance,
  IGlobalService,
  ILanguage,
  ISmartSearchQuery,
} from '@/shared/types';
import { StyledResultList } from './styled-components';
import { ClinicsItem } from './clinics-item';
import { ImageSize } from '@/shared/enums';
import { useMemo } from 'react';

// TODO рефактор

interface Props {
  result: ISmartSearchResult;
  search: string;
  handleChooseOptionCb?: (customQuery: ISmartSearchQuery) => void;
}

export const ResultList = ({
  result: { type, list },
  search,
  handleChooseOptionCb,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { useCustomQuery, smartSearchLocation } = useAppSelector(
    state => state.smartSearch,
  );

  const filterTargetUrl = useMemo(() => {
    if (smartSearchLocation === 'clinics') {
      return CLINICS_PAGE;
    }

    return DOCTORS_PAGE;
  }, [smartSearchLocation]);

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
              const { id, name } = item as ISpecialty;

              return (
                <ListItemButton
                  key={`spec-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${filterTargetUrl}?specialty=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'specialties',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(name, search)}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'globalService':
      return (
        <StyledResultList>
          <Typography variant="h3">Услуги</Typography>
          <List>
            {list.map(item => {
              const { id, name } = item as IGlobalService;

              return (
                <ListItemButton
                  key={`service-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${filterTargetUrl}?service=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'services',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(name, search, '', false)}
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
            {list.map(item => (
              <ClinicsItem
                key={item.id}
                data={item as IClinic}
                location={smartSearchLocation}
                useCustomQuery={useCustomQuery}
                handleChooseOptionCb={handleChooseOptionCb}
                closeSearchBox={closeSearchBox}
                searchString={search}
              />
            ))}
          </List>
        </StyledResultList>
      );
    case 'docs':
      return (
        <StyledResultList>
          <Typography variant="h3">Врачи</Typography>
          <List>
            {list.map(item => {
              const { id, image, fullName, specialties } = item as IDoctor;

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
                    variant="circular"
                    src={getImageUrl(image, ImageSize.Thumb)}
                  />
                  <div className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(fullName, search)}
                    </Typography>
                    <Typography variant="caption">
                      {specialties.map(spec => spec.name).join(', ')}
                    </Typography>
                  </div>
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
                  href={`${filterTargetUrl}?insurance=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'insurances',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image, ImageSize.Thumb)}
                  />
                  <div className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(name, search)}
                    </Typography>
                  </div>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    default:
      return (
        <StyledResultList>
          <Typography variant="h3">Языки врача</Typography>
          <List>
            {list.map(item => {
              const { id, name } = item as ILanguage;

              return (
                <ListItemButton
                  key={`lang-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${filterTargetUrl}?lang=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'languages',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(name, search, 'язык')}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
  }
};
