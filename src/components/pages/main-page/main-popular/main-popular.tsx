import { CardsList, StyledInner } from './components';
import { ContainerComponent } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { ISpecialty } from '@/shared/types/specialty.type';

interface Props {
  specialties: ISpecialty[] | null;
}

export const MainPopular = ({ specialties = [] }: Props) => {
  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            Популярные направления
          </Title>
          {specialties && <CardsList specialties={specialties} />}
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
