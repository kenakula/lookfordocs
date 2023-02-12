import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { StyledInner, StyledList, StyledService } from './components';
import { getImageUrl, PageSection, Title } from '@/shared/assets';
import { IMainService } from '@/shared/types/main-service.type';

interface Props {
  services?: IMainService[];
}

export const MainServices = ({ services = [] }: Props): JSX.Element => {
  return (
    <PageSection>
      <Container>
        <StyledInner>
          <Title className="title" variant="h2" textAlign="center">
            Услуги
          </Title>
          <StyledList>
            {services.map(
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
      </Container>
    </PageSection>
  );
};
