import Image from 'next/image';
import { Typography } from '@mui/material';
import {
  StyledImageContainer,
  StyledInfoContainer,
  StyledInner,
  StyledList,
  StyledListItem,
} from './components';
import { ContainerComponent } from '@/components';
import { getImageUrl, PageSection, Title } from '@/shared/assets';
import { IAdvantage } from '@/shared/types';

interface Props {
  advantages: IAdvantage[] | null;
}

export const MainAdvantages = ({ advantages = [] }: Props): JSX.Element => {
  return (
    <PageSection>
      <ContainerComponent>
        <StyledInner>
          <Title className="title" textAlign="center" variant="h2">
            Почему нас выбирают?
          </Title>
          <StyledList>
            {advantages &&
              advantages.map(({ id, title, description, image }) => (
                <StyledListItem key={id}>
                  <StyledImageContainer className="image-container">
                    <Image
                      src={getImageUrl(image.id, `advantage-${id}`)}
                      alt=""
                      width={image.width}
                      height={image.height}
                    />
                  </StyledImageContainer>
                  <StyledInfoContainer>
                    <Title
                      variant="h3"
                      textAlign="center"
                      minor
                      dangerouslySetInnerHTML={{ __html: title }}
                    />
                    <Typography textAlign="center">{description}</Typography>
                  </StyledInfoContainer>
                </StyledListItem>
              ))}
          </StyledList>
        </StyledInner>
      </ContainerComponent>
    </PageSection>
  );
};
