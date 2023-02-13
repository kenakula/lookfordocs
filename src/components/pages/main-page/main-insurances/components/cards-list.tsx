import {
  Typography,
  Link as MuiLink,
  useMediaQuery,
  Button,
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import {
  StyledList,
  StyledCard,
  StyledButtonContainer,
} from './styled-components';
import { ButtonComponent } from '@/components';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { IInsurance } from '@/shared/types/insurance.type';
import { getImageUrl } from '@/shared/assets';

const CARD_HEIGHT = 120;
const CARD_GAP = 12;
const CARDS_COUNT_SHOW = 4;

interface Props {
  insurances: IInsurance[];
}

export const CardsList = ({ insurances }: Props): JSX.Element => {
  const [showedCards, setShowedCards] = useState(CARDS_COUNT_SHOW);
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme ? theme.breakpoints.up('md') : '');

  const handleChange = () => {
    setShowedCards(prev => (prev !== 0 ? 0 : CARDS_COUNT_SHOW));
  };

  return (
    <>
      <StyledList gap={CARD_GAP}>
        {insurances
          .slice(matches ? 0 : showedCards)
          .map(({ id, name, image }) => (
            <StyledCard minHeight={CARD_HEIGHT} key={id}>
              <MuiLink underline="none" href="#" component={Link}>
                <Typography className="visually-hidden" variant="h3">
                  {name}
                </Typography>
                <Image
                  src={getImageUrl(image.id, `insurance-${name}`)}
                  width={image.width}
                  height={image.height}
                  alt=""
                />
              </MuiLink>
            </StyledCard>
          ))}
      </StyledList>
      {matches ? (
        <StyledButtonContainer>
          <Button
            className="button-link"
            component={Link}
            href="#"
            variant="outlined"
            disableFocusRipple
            disableRipple
          >
            Показать все
          </Button>
        </StyledButtonContainer>
      ) : (
        <StyledButtonContainer>
          <ButtonComponent
            className="button-link"
            fullWidth
            onClick={handleChange}
            variant="outlined"
            text={showedCards === 0 ? 'Скрыть' : 'Показать все'}
          />
        </StyledButtonContainer>
      )}
    </>
  );
};
