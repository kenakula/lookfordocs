import { Container } from '@mui/material';
import { CardsList, StyledInner } from './components';
import { PageSection, Subtitle, Title } from '@/shared/assets';
import { IInsurance } from '@/shared/types/insurance.type';

interface Props {
  insurances?: IInsurance[];
}

export const MainInsurances = ({ insurances = [] }: Props): JSX.Element => {
  return (
    <PageSection bgColor="beje">
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Страховые компании
          </Title>
          <Subtitle className="subtitle" textAlign="center">
            Выберите свою страховую и узнайте какие докторы принимаю по ней
          </Subtitle>
          <CardsList insurances={insurances} />
        </StyledInner>
      </Container>
    </PageSection>
  );
};
