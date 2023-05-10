import React, { useState } from 'react';
import {
  Typography,
  Link as MuiLink,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { ButtonComponent } from '@/components';
import { ISpecialty } from '@/shared/types';
import {
  capitalize,
  DOCTORS_PAGE,
  numWord,
  pushGtmEvent,
} from '@/shared/assets';
import { Breakpoints } from '@/shared/enums';
import {
  StyledList,
  StyledCard,
  StyledButtonContainer,
} from './styled-components';

const CARD_HEIGHT = 98;
const CARD_GAP = 12;
const CARDS_COUNT_SHOW = 4;

interface Props {
  specialties?: ISpecialty[];
}

export const CardsList = ({ specialties = [] }: Props): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const matches = useMediaQuery(Breakpoints.Tablet);

  const handleChange = () => {
    setExpanded(prev => !prev);
  };

  const onLinkClick = (name: string, count: string) => {
    pushGtmEvent('mainPagePopularClickEvent', {
      eventValue: count,
      eventContent: name,
    });
  };

  const collapsedSize =
    CARDS_COUNT_SHOW * CARD_HEIGHT + CARDS_COUNT_SHOW * CARD_GAP;

  const getCountValue = (value: number): string => {
    const words = ['врач', 'врача', 'врачей'];

    return `${value} ${numWord(value, words)}`;
  };

  return (
    <>
      <Collapse
        in={expanded || matches}
        collapsedSize={matches ? 0 : collapsedSize}
      >
        <StyledList gap={CARD_GAP}>
          {specialties.map(({ id, name, doctors }) => (
            <StyledCard minHeight={CARD_HEIGHT} key={id}>
              <MuiLink
                underline="none"
                href={`${DOCTORS_PAGE}?specialty=${id}`}
                component={Link}
                onClick={() =>
                  onLinkClick(capitalize(name), getCountValue(doctors.length))
                }
              >
                <Typography variant="h3">{capitalize(name)}</Typography>
                <Typography variant="caption">
                  {getCountValue(doctors.length)}
                </Typography>
              </MuiLink>
            </StyledCard>
          ))}
        </StyledList>
      </Collapse>
      {!matches && specialties.length > 4 ? (
        <StyledButtonContainer>
          <ButtonComponent
            fullWidth
            onClick={handleChange}
            variant="outlined"
            text={expanded ? 'Скрыть' : 'Показать все'}
          />
        </StyledButtonContainer>
      ) : null}
    </>
  );
};
