import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { ButtonComponent } from '@/components';
import { IInsurance } from '@/shared/types/insurance.type';
import { getImageUrl, DOCTORS_PAGE } from '@/shared/assets';
import {
  StyledList,
  StyledCard,
  StyledButtonContainer,
} from './styled-components';

const CARD_HEIGHT = 120;
const CARD_GAP = 12;

interface Props {
  insurances: IInsurance[];
  cardsNumber: number;
  handleExpand: () => void;
  expanded: boolean;
}

export const CardsList = ({
  expanded,
  insurances,
  cardsNumber,
  handleExpand,
}: Props): JSX.Element => {
  return (
    <>
      <StyledList gap={CARD_GAP}>
        {insurances.map(({ id, name, image }, index: number) =>
          index < cardsNumber ? (
            <StyledCard minHeight={CARD_HEIGHT} key={id}>
              <MuiLink
                underline="none"
                href={`${DOCTORS_PAGE}?insurance=${id}`}
                component={Link}
              >
                <Image
                  src={getImageUrl(image)}
                  fill
                  alt={name}
                  quality={100}
                  sizes="(max-width: 601px) 93vw, (max-width: 1129px) 44vw, 246px"
                />
              </MuiLink>
            </StyledCard>
          ) : null,
        )}
      </StyledList>
      <StyledButtonContainer>
        <ButtonComponent
          className="button-link"
          fullWidth
          variant="outlined"
          text={expanded ? 'Скрыть' : 'Показать все'}
          onClick={handleExpand}
        />
      </StyledButtonContainer>
    </>
  );
};
