import { Skeleton } from '@mui/material';
import { ContainerComponent } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { CardsList, StyledInner } from './components';
import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '@/api';

export const MainPopular = () => {
  const { data: specialties, isLoading } = useQuery(['mainPopular'], {
    queryFn: () => getSpecialties(true),
    staleTime: Infinity,
  });

  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            Популярные направления
          </Title>
          {isLoading && <Skeleton height={268} />}
          <CardsList specialties={specialties} />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
