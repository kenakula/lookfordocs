import { Box, useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent, DoctorCard } from '@/components';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { capitalizeName, DetailedPageLayout } from '@/shared/assets';
import { IDoctor } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { DetailedDoctorClinics, DetailedInfo } from './components';

interface Props {
  data: IDoctor;
}

export const DetailedDoctorPage = ({ data }: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();
  const doctorName = capitalizeName(data.fullName);

  const openRequestForm = () => {
    dispatch(
      openAppointmentDialog({
        name: doctorName,
        id: data.id,
        image: data.image,
        type: 'doctor',
      }),
    );
  };

  return (
    <ContainerComponent>
      <DetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о враче</h2>
        <Box className="detailed-left-column">
          <DoctorCard data={data} detailedLocation />
          {isTablet ? <DetailedInfo data={data} /> : null}
        </Box>
        <Box className="detailed-right-column">
          <Box className="sticky-block">
            <ButtonComponent
              className="detailed-button"
              text="Записаться к врачу"
              fullWidth
              variant="contained"
              size="large"
              onClick={openRequestForm}
            />
            <DetailedDoctorClinics
              reembolso={data.reembolso}
              clinics={data.clinics}
            />
          </Box>
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          {!isTablet ? <DetailedInfo data={data} /> : null}
        </Box>
      </DetailedPageLayout>
    </ContainerComponent>
  );
};
