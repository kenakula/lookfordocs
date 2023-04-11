import { useMediaQuery } from '@mui/material';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { ButtonComponent, ClinicCard, ContainerComponent } from '@/components';
import { IClinic } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { capitalize, DetailedPageLayout } from '@/shared/assets';
import { DetailedInfo } from './components';
import { ClinicCardAside } from '@/components/clinic-card/components';
import { useQuery } from '@tanstack/react-query';
import { getClinicTestimonials } from '@/api';

interface Props {
  data: IClinic;
}

export const DetailedClinicPage = ({ data }: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();

  const { data: clinicTestimonials } = useQuery({
    queryKey: ['clinicTestimonials', data.id],
    queryFn: () => getClinicTestimonials(data.id.toString()),
    staleTime: Infinity,
  });

  const clinicName = capitalize(data.name);

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({
        clinic: data,
        type: 'clinic',
      }),
    );
  };

  return (
    <ContainerComponent>
      <DetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о клинике</h2>
        <div className="detailed-left-column">
          <ClinicCard
            data={data}
            detailedLocation
            testimonials={clinicTestimonials}
          />
          {isTablet && clinicTestimonials ? (
            <DetailedInfo data={data} testimonials={clinicTestimonials} />
          ) : null}
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
        <div>
          {!isTablet && clinicTestimonials ? (
            <DetailedInfo data={data} testimonials={clinicTestimonials} />
          ) : null}
        </div>
      </DetailedPageLayout>
    </ContainerComponent>
  );
};
