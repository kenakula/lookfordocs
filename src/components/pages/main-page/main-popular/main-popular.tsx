import { CardsList, StyledInner } from './components';
import { Container } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { ISpecialty } from '@/shared/types/specialty.type';

interface Props {
  specialties?: ISpecialty[];
}

export const MainPopular = ({ specialties = [] }: Props) => {
  return (
    <PageSection>
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            Популярные направления
          </Title>
          {specialties && <CardsList specialties={specialties} />}
        </StyledInner>
      </Container>
    </PageSection>
  );
};
