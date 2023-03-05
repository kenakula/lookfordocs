import { Breadcrumbs, useMediaQuery } from '@mui/material';
import { ContainerComponent } from '../container-component/container-component';
import { StyledBreadcrumbs, Crumb } from './components';
import { DESKTOP_BREAKPOINT, HOME_PAGE } from '@/shared/assets';
import { IBreadCrumb } from '@/shared/types';

interface Props {
  crumbs: IBreadCrumb[];
}

export const BreadcrumbsComponent = ({ crumbs }: Props): JSX.Element => {
  const list: IBreadCrumb[] = [{ text: 'Главная', link: HOME_PAGE }, ...crumbs];
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  return (
    <ContainerComponent>
      <StyledBreadcrumbs className={isDesktop ? '' : 'visually-hidden'}>
        <Breadcrumbs aria-label="хлебные крошки">
          {list.map(crumb => (
            <Crumb key={crumb.text} data={crumb} />
          ))}
        </Breadcrumbs>
      </StyledBreadcrumbs>
    </ContainerComponent>
  );
};
