import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { Subtitle, Title } from '@/shared/assets';
import { IPromoBlockData } from '@/shared/types';
import {
  ButtonComponent,
  ChipComponent,
  ContainerComponent,
} from '@/components';
import { Becas } from '@/components/icons';
import { StyledChips, StyledPromoSection } from './components';

interface Props {
  promoData: IPromoBlockData;
}

export const Promo = ({ promoData }: Props): JSX.Element => {
  const dispatch = useAppDispatch();

  const openRequestDialog = () => {
    dispatch(openAppointmentDialog());
  };

  return (
    <StyledPromoSection component="section">
      <ContainerComponent>
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

        <ButtonComponent
          className="promo-button"
          type="button"
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          text="Записаться к врачу"
          onClick={openRequestDialog}
        />
        <Becas className="becas" />
      </ContainerComponent>
    </StyledPromoSection>
  );
};
