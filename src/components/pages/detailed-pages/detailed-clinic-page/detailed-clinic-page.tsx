import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, useMediaQuery } from '@mui/material';
import { getClinicTestimonials } from '@/api';
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
  const clinicId = data.id.toString();
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['clinicTestimonials', clinicId],
    queryFn: () => getClinicTestimonials(clinicId),
    staleTime: Infinity,
  });
  const dispatch = useAppDispatch();

  const clinicName = useMemo(() => capitalize(data.name), [data.name]);

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

  const testimonialsCount = testimonials ? testimonials.length : undefined;
  const avarageRating = useMemo(() => {
    if (!testimonials) {
      return undefined;
    }

    const sum = testimonials.reduce((prev, curr) => prev + curr.rate, 0);
    return sum === 0 ? 0 : sum / testimonials.length;
  }, [testimonials]);

  return (
    <ContainerComponent>
      <DetailedPageLayout>
        <h2 className="visually-hidden">Общая информация о клинике</h2>
        <div className="detailed-left-column">
          <ClinicCard
            data={data}
            detailedLocation
            rating={avarageRating}
            testimonialsCount={testimonialsCount}
          />
          {isTablet ? (
            <DetailedInfo
              data={data}
              testimonials={testimonials}
              testimonialsLoading={testimonialsLoading}
            />
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
        <Box>
          {!isTablet ? (
            <DetailedInfo
              data={data}
              testimonials={testimonials}
              testimonialsLoading={testimonialsLoading}
            />
          ) : null}
        </Box>
      </DetailedPageLayout>
    </ContainerComponent>
  );
};
