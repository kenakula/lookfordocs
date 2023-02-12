import { Container } from '@mui/material';
import { StyledInner } from './components';
import { PageSection, Subtitle, Title } from '@/shared/assets';

export const MainInsurances = (): JSX.Element => {
  return (
    <PageSection>
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Страховые компании
          </Title>
          <Subtitle className="subtitle">
            Выберите свою страховую и узнайте какие докторы принимаю по ней
          </Subtitle>
        </StyledInner>
      </Container>
    </PageSection>
  );
};
