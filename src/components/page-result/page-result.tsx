import { ContainerComponent } from '@/components';
import { StyledPageResultSection } from './components';

interface Props {
  children: React.ReactNode;
}

export const PageResult = ({ children }: Props): JSX.Element => {
  return (
    <StyledPageResultSection>
      <ContainerComponent>{children}</ContainerComponent>
    </StyledPageResultSection>
  );
};
