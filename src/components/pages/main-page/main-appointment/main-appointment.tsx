import { useMediaQuery } from '@mui/material';
import { ButtonComponent, ContainerComponent } from '@/components';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { IBlockData } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { StyledInner } from './components';
import { openAppointmentDialog, useAppDispatch } from '@/stores';

interface Props {
  appointmentData: IBlockData | null;
}

export const MainAppointment = ({ appointmentData }: Props): JSX.Element => {
  const matches = useMediaQuery(Breakpoints.Desktop);
  const dispatch = useAppDispatch();

  const openAppointmentForm = () => {
    dispatch(openAppointmentDialog());
  };

  const getMobileTitle = (): string => {
    if (!appointmentData) {
      return '';
    }

    return appointmentData.titleMobile ?? appointmentData.title;
  };

  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          {appointmentData && (
            <>
              <Title
                className="title"
                variant="h2"
                minor
                textAlign="center"
                dangerouslySetInnerHTML={{
                  __html: matches ? appointmentData.title : getMobileTitle(),
                }}
              />
              <Subtitle className="subtitle">
                {appointmentData.subtitle}
              </Subtitle>
            </>
          )}
          <ButtonComponent
            type="button"
            variant="outlined"
            fullWidth
            text="Записаться"
            onClick={openAppointmentForm}
          />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
