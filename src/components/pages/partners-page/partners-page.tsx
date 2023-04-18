import { ContainerComponent } from '@/components';
import { Subtitle, Title } from '@/shared/assets';
import { DoctorsForm } from './components';

export const PartnersPage = (): JSX.Element => {
  return (
    <ContainerComponent>
      <Title variant="h2" textAlign="center">
        <span className="highlighted">Докторам</span> и{' '}
        <span className="highlighted">Клиникам</span>
      </Title>
      <Subtitle>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi vitae
        quos veritatis laboriosam a magni autem. Obcaecati molestias harum
        officia, sit necessitatibus velit reprehenderit nam.
      </Subtitle>
      <DoctorsForm />
    </ContainerComponent>
  );
};
