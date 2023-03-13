import { Subtitle, Title } from '@/shared/assets';
import { IPromoBlockData } from '@/shared/types';
import { ContainerComponent } from '@/components';
import { Becas } from '@/components/icons';
import { ChipComponent } from '../chip-component/chip-component';
import { ButtonComponent } from '../button-component/button-component';
import { StyledChips, StyledPromoSection } from './components';

interface Props {
  promoData: IPromoBlockData;
}

export const Promo = ({ promoData }: Props): JSX.Element => {
  return (
    <StyledPromoSection component="section">
      <ContainerComponent>
        <Title
          className="title"
          variant="h2"
          dangerouslySetInnerHTML={{ __html: promoData.title }}
        />
        <Subtitle className="subtitle" variant="body1">
          {promoData.subtitle}
        </Subtitle>
        {promoData.chips ? (
          <StyledChips className="chips">
            {promoData.chips.map(chip => (
              <li key={chip.text}>
                <ChipComponent data={chip} />
              </li>
            ))}
          </StyledChips>
        ) : null}
        <ButtonComponent
          className="promo-button"
          type="button"
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          text="Записаться к врачу"
        />
        <Becas className="becas" />
      </ContainerComponent>
    </StyledPromoSection>
  );
};
