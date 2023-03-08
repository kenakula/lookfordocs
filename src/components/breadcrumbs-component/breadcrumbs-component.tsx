import { Breadcrumbs, useMediaQuery } from '@mui/material';
import { ContainerComponent } from '../container-component/container-component';
import { StyledBreadcrumbs, Crumb } from './components';
import { HOME_PAGE, TABLET_WIDE_BREAKPOINT } from '@/shared/assets';
import { IBreadCrumb } from '@/shared/types';

interface Props {
  crumbs: IBreadCrumb[];
}

export const BreadcrumbsComponent = ({ crumbs }: Props): JSX.Element => {
  const list: IBreadCrumb[] = [{ text: 'Главная', link: HOME_PAGE }, ...crumbs];
  const isDesktop = useMediaQuery(TABLET_WIDE_BREAKPOINT);

  return (
    <ContainerComponent>
      <StyledBreadcrumbs className={isDesktop ? '' : 'visually-hidden'}>
        <Breadcrumbs aria-label="навигация">
          {list.map(crumb => (
            <Crumb key={crumb.text} data={crumb} />
          ))}
        </Breadcrumbs>
      </StyledBreadcrumbs>
    </ContainerComponent>
  );
};
