import { Breadcrumbs, useMediaQuery } from '@mui/material';
import { ContainerComponent } from '@/components';
import { HOME_PAGE } from '@/shared/assets';
import { IBreadCrumb } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { StyledBreadcrumbs, Crumb } from './components';

interface Props {
  crumbs: IBreadCrumb[];
}

export const BreadcrumbsComponent = ({ crumbs }: Props): JSX.Element => {
  const list: IBreadCrumb[] = [{ text: 'Главная', link: HOME_PAGE }, ...crumbs];
  const isDesktop = useMediaQuery(Breakpoints.TabeltWide);

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
