import { ContainerComponent } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { ISpecialty } from '@/shared/types';
import { CardsList, StyledInner } from './components';

interface Props {
  specialties: ISpecialty[];
}

export const MainPopular = ({ specialties = [] }: Props) => {
  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            Популярные направления
          </Title>
          <CardsList specialties={specialties} />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
