import { useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { ButtonComponent, ClinicCard, ContainerComponent } from '@/components';
import { IClinic } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { capitalize, DetailedPageLayout } from '@/shared/assets';
import { DetailedInfo } from './components';
import { ClinicCardAside } from '@/components/clinic-card/components';

interface Props {
  data: IClinic;
}

export const DetailedClinicPage = ({ data }: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();

  const clinicName = capitalize(data.name);

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({
        name: clinicName,
        id: data.id,
        image: data.image,
        type: 'clinic',
      }),
    );
  };

  return (
    <ContainerComponent>
      <DetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о клинике</h2>
        <div className="detailed-left-column">
          <ClinicCard data={data} detailedLocation />
          {isTablet ? <DetailedInfo data={data} /> : null}
        </div>
        <div className="detailed-right-column">
          <div className="sticky-block">
            <ButtonComponent
              className="detailed-button"
              text="Записаться"
              fullWidth
              variant="contained"
              size="large"
              onClick={openRequestForm}
            />
            <ClinicCardAside
              data={data}
              clinicName={clinicName}
              detailedLocation
            />
          </div>
        </div>
        <div>{!isTablet ? <DetailedInfo data={data} /> : null}</div>
      </DetailedPageLayout>
    </ContainerComponent>
  );
};
