import { CardsList, StyledInner } from './components';
import { ContainerComponent } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { ICountedSpecialties, ISpecialty } from '@/shared/types/specialty.type';

interface Props {
  specialties: ISpecialty[] | null;
  countedSpecialties: ICountedSpecialties[] | null;
}

export const MainPopular = ({
  specialties = [],
  countedSpecialties = [],
}: Props) => {
  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            Популярные направления
          </Title>
          {specialties && countedSpecialties && (
            <CardsList
              specialties={specialties}
              countedSpecialties={countedSpecialties}
            />
          )}
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
