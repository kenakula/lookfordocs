import { Skeleton } from '@mui/material';
import { ContainerComponent } from '../container-component/container-component';
import { StyledLayoutSkeleton } from './components';

interface Props {
  children?: JSX.Element | JSX.Element[];
}

export const LayoutSkeleton = ({ children }: Props): JSX.Element => {
  return (
    <StyledLayoutSkeleton>
      <Skeleton variant="rectangular" className="header-skeleton" />
      <ContainerComponent style={{ flexGrow: 1 }}>
        {children}
      </ContainerComponent>
      <Skeleton className="footer-skeleton" />
    </StyledLayoutSkeleton>
  );
};
