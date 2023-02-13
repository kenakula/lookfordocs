import { Container } from '@mui/material';
import { StyledInner } from './components';
import { PageSection, Title } from '@/shared/assets';

export const MainTestimonials = (): JSX.Element => {
  return (
    <PageSection bgColor="blue">
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Отзывы
          </Title>
        </StyledInner>
      </Container>
    </PageSection>
  );
};
