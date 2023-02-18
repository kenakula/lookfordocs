import { useMediaQuery } from '@mui/material';
import { StyledInner } from './components';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { ButtonComponent, ContainerComponent } from '@/components';
import { useCustomTheme } from '@/stores/theme-store-provider';
import { IMainAppointment } from '@/shared/types';

interface Props {
  appointmentData: IMainAppointment | null;
}

export const MainAppointment = ({ appointmentData }: Props): JSX.Element => {
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme ? theme.breakpoints.up('lg') : '');

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
          />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
