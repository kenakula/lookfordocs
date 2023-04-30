import { Skeleton } from '@mui/material';
import { ContainerComponent } from '@/components';
import { PageSection, Title } from '@/shared/assets';
import { CardsList, StyledInner } from './components';
import { useQuery } from '@tanstack/react-query';
import { getSpecialties } from '@/api';
import { IBlockData } from '@/shared/types';

interface Props {
  data: IBlockData;
}

export const MainPopular = ({ data: { title } }: Props) => {
  const { data: specialties, isLoading } = useQuery(['mainPopular'], {
    queryFn: () => getSpecialties(true),
    staleTime: Infinity,
  });

  return (
    <PageSection shortBottom>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" minor>
            {title}
          </Title>
          {isLoading && <Skeleton height={268} />}
          <CardsList specialties={specialties} />
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
