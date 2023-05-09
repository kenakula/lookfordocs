import { ChipComponent } from '@/components';
import { Title, Subtitle } from '@/shared/assets';
import { IPromoBlockData } from '@/shared/types';
import { StyledChips } from './styled-components';

interface Props {
  promoData: IPromoBlockData;
}

export const PromoDataBlock = ({ promoData }: Props): JSX.Element => {
  return (
    <div
      className={`promo-info ${
        !promoData.chips || !promoData.chips.length ? 'padded' : ''
      }`}
    >
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
    </div>
  );
};
