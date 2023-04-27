import { Box, useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent, DoctorCard } from '@/components';
import { openAppointmentDialog, useAppDispatch } from '@/stores';
import { DetailedPageLayout } from '@/shared/assets';
import { IDoctor, SelectedSlot } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import {
  DetailedDoctorAppointment,
  DetailedDoctorClinics,
  DetailedInfo,
} from './components';
import { useQuery } from '@tanstack/react-query';
import { getDoctorTestimonials } from '@/api';
import { getAppointmentTabs } from './assets';

interface Props {
  data: IDoctor;
}

export const DetailedDoctorPage = ({ data }: Props): JSX.Element => {
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const dispatch = useAppDispatch();
  const apppointmentTabs = getAppointmentTabs(data);

  const { data: doctorTestimonials } = useQuery({
    queryKey: ['doctorTestimonials', data.id],
    queryFn: () => getDoctorTestimonials(data.id.toString()),
    staleTime: Infinity,
  });

  const openRequestForm = (slot?: SelectedSlot) => {
    dispatch(
      openAppointmentDialog({
        doctor: data,
        type: 'doctor',
        slot,
      }),
    );
  };

  return (
    <ContainerComponent>
      <DetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о враче</h2>
        <Box className="detailed-left-column">
          <DoctorCard
            data={data}
            detailedLocation
            testimonials={doctorTestimonials}
          />
          {isTablet && doctorTestimonials ? (
            <DetailedInfo data={data} testimonials={doctorTestimonials} />
          ) : null}
        </Box>
        <Box className="detailed-right-column">
          <Box className="sticky-block">
            <ButtonComponent
              className="detailed-button"
              text="Записаться к врачу"
              fullWidth
              variant="contained"
              size="large"
              onClick={() => openRequestForm()}
            />
            <div className="detailed-doctor-aside">
              <DetailedDoctorClinics
                reembolso={data.reembolso}
                clinics={data.clinics}
              />
              {apppointmentTabs.length ? (
                <DetailedDoctorAppointment
                  data={data}
                  tabsList={apppointmentTabs}
                  openAppointmentDialog={openRequestForm}
                />
              ) : null}
            </div>
          </Box>
        </Box>
        <Box sx={{ overflow: 'hidden' }}>
          {!isTablet && doctorTestimonials ? (
            <DetailedInfo data={data} testimonials={doctorTestimonials} />
          ) : null}
        </Box>
      </DetailedPageLayout>
    </ContainerComponent>
  );
};
