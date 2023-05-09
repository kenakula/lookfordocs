import { useEffect } from 'react';
import {
  closeAppointmentDialog,
  openAppointmentDialog,
  toggleContactDialog,
  useAppDispatch,
} from '@/stores';
import { ButtonComponent, ContainerComponent } from '@/components';
import { IPromoBlockData } from '@/shared/types';
import { Becas } from '@/components/icons';
import {
  ContactsBlock,
  PromoDataBlock,
  StyledPromoSection,
} from './components';

interface Props {
  promoData: IPromoBlockData;
}

export const Promo = ({ promoData }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const buttonText = promoData.buttonText ?? 'Записаться к врачу';

  const openDialog = () => {
    if (promoData.type === 'contact') {
      dispatch(toggleContactDialog(true));
      return;
    }

    dispatch(openAppointmentDialog());
  };

  useEffect(() => {
    return () => {
      dispatch(closeAppointmentDialog());
      dispatch(toggleContactDialog(false));
    };
  }, [dispatch]);

  return (
    <StyledPromoSection>
      <ContainerComponent>
        {promoData.type === 'appointment' && (
          <PromoDataBlock promoData={promoData} />
        )}

        {promoData.type === 'contact' && (
          <ContactsBlock promoData={promoData} />
        )}

        <ButtonComponent
          className="promo-button"
          type="button"
          color="secondary"
          variant="contained"
          size="large"
          fullWidth
          text={buttonText}
          onClick={openDialog}
        />
        <Becas className="becas" />
      </ContainerComponent>
    </StyledPromoSection>
  );
};
