import { Typography, useMediaQuery } from '@mui/material';
import { StyledInner } from './components';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { ButtonComponent, Container } from '@/components';
import { useCustomTheme } from '@/stores/theme-store-provider';

export const MainAppointment = (): JSX.Element => {
  const { theme } = useCustomTheme();
  const matches = useMediaQuery(theme ? theme.breakpoints.up('lg') : '');

  return (
    <PageSection shortBottom>
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" minor textAlign="center">
            Не нашли подходящего врача? Запишитесь на{' '}
            {matches ? (
              <Typography component="span" className="highlighted">
                онлайн консультацию
              </Typography>
            ) : (
              <>
                <Typography component="span" className="highlighted">
                  онлайн{' '}
                </Typography>
                <Typography component="span" className="highlighted">
                  консультацию
                </Typography>
              </>
            )}
          </Title>
          <Subtitle className="subtitle">365 врача со всего мира</Subtitle>
          <ButtonComponent
            type="button"
            variant="outlined"
            fullWidth
            text="Записаться"
          />
        </StyledInner>
      </Container>
    </PageSection>
  );
};
