import { Container } from '@mui/material';
import { StyledInner } from './components';
import { CardsList } from './components/cards-list';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { IInsurance } from '@/shared/types/insurance.type';

interface Props {
  insurances?: IInsurance[];
}

export const MainInsurances = ({ insurances = [] }: Props): JSX.Element => {
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
          <CardsList insurances={insurances} />
        </StyledInner>
      </Container>
    </PageSection>
  );
};
