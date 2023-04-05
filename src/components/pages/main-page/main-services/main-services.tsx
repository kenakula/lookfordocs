import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { getImageUrl, PageSection, Title } from '@/shared/assets';
import { IMainPageService } from '@/shared/types';
import { ContainerComponent } from '@/components';
import { StyledInner, StyledList, StyledService } from './components';

interface Props {
  services: IMainPageService[];
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
            {services.map(({ id, title, description, image }) => (
              <StyledService key={id}>
                <Box className="image-container">
                  <Image
                    src={getImageUrl(image)}
                    alt=""
                    fill
                    quality={100}
                    sizes="(max-width: 769px) 280px, 24vw"
                  />
                </Box>
                <Typography textAlign="center" variant="h3">
                  {title}
                </Typography>
                <Typography textAlign="center">{description}</Typography>
              </StyledService>
            ))}
          </StyledList>
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
