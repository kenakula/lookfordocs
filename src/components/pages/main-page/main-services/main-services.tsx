import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { StyledInner, StyledList, StyledService } from './components';
import { getImageUrl, PageSection, Title } from '@/shared/assets';
import { IMainService } from '@/shared/types/main-service.type';
import { ContainerComponent } from '@/components/container-component/container-component';

interface Props {
  services: IMainService[] | null;
}

export const MainServices = ({ services = [] }: Props): JSX.Element => {
  return (
    <PageSection>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Услуги
          </Title>
          <StyledList>
            {services &&
              services.map(
                ({
                  id,
                  title,
                  description,
                  image: { id: imageId, width, height },
                }) => (
                  <StyledService key={id}>
                    <Box className="image-container">
                      <Image
                        src={getImageUrl(imageId, `service-image-${id}`)}
                        alt=""
                        width={width}
                        height={height}
                      />
                    </Box>
                    <Typography textAlign="center" variant="h3">
                      {title}
                    </Typography>
                    <Typography textAlign="center">{description}</Typography>
                  </StyledService>
                ),
              )}
          </StyledList>
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
