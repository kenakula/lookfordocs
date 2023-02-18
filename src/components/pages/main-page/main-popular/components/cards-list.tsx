import {
  Typography,
  Link as MuiLink,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  StyledList,
  StyledCard,
  StyledButtonContainer,
} from './styled-components';
import { ButtonComponent } from '@/components';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { ISpecialty, ICountedSpecialties } from '@/shared/types';
import { numWord, SEARCH_PAGE } from '@/shared/assets';

const CARD_HEIGHT = 98;
const CARD_GAP = 12;
const CARDS_COUNT_SHOW = 4;

interface Props {
  specialties: ISpecialty[];
  countedSpecialties: ICountedSpecialties[];
}

export const CardsList = ({
  specialties,
  countedSpecialties,
}: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme ? theme.breakpoints.up('md') : '');

  const handleChange = () => {
    setExpanded(prev => !prev);
  };

  const collapsedSize =
    CARDS_COUNT_SHOW * CARD_HEIGHT + CARDS_COUNT_SHOW * CARD_GAP;

  const getCapitilizedTitle = (str: string): string => {
    return str
      .split(' ')
      .map((word: string, index: number) =>
        index === 0 ? word[0].toUpperCase() + word.slice(1) : word,
      )
      .join(' ');
  };

  const getSpecialtyCount = (id: number): number => {
    const spec = countedSpecialties.find(item => item.specialties_id === id);

    if (spec) {
      return spec.count.doctors_id;
    }

    return 0;
  };

  const getCountValue = (specId: number): string => {
    const count = getSpecialtyCount(specId);
    const words = ['врач', 'врача', 'врачей'];

    return `${count} ${numWord(count, words)}`;
  };

  return (
    <>
      <Collapse
        in={expanded || matches}
        collapsedSize={matches ? 0 : collapsedSize}
      >
        <StyledList gap={CARD_GAP}>
          {specialties.map(({ id, title, slug }) => (
            <StyledCard minHeight={CARD_HEIGHT} key={id}>
              <MuiLink
                underline="none"
                href={`${SEARCH_PAGE}?specialty=${slug}`}
                component={Link}
              >
                <Typography variant="h3">
                  {getCapitilizedTitle(title)}
                </Typography>
                <Typography variant="caption">{getCountValue(id)}</Typography>
              </MuiLink>
            </StyledCard>
          ))}
        </StyledList>
      </Collapse>
      {!matches && (
        <StyledButtonContainer>
          <ButtonComponent
            fullWidth
            onClick={handleChange}
            variant="outlined"
            text={expanded ? 'Скрыть' : 'Показать все'}
          />
        </StyledButtonContainer>
      )}
    </>
  );
};
