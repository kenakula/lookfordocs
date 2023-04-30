import dynamic from 'next/dynamic';
import { Typography } from '@mui/material';
import {
  ContainerComponent,
  TabPanelComponent,
  TabsListComponent,
  useTabs,
} from '@/components';
import { IPartnersPageData } from '@/shared/types';
import { Title } from '@/shared/assets';
import {
  DoctorsForm,
  StyledPartnersPageTabs,
  StyledPartnersPageWrapper,
  StyledPartnersPanels,
} from './components';

const DynamicClinicForm = dynamic(() =>
  import('./components/clinics-form').then(mod => mod.ClinicsForm),
);

interface Props {
  data: IPartnersPageData;
}

export const PartnersPage = ({
  data: { title, description, tabs },
}: Props): JSX.Element => {
  const { currentTabValue, handleTabChange } = useTabs({ tabsList: tabs });

  return (
    <ContainerComponent>
      <StyledPartnersPageWrapper>
        <Title variant="h2" textAlign="center">
          {title}
        </Title>
        <Typography textAlign="center">{description}</Typography>
        <StyledPartnersPageTabs>
          <TabsListComponent
            className="partners-tabs-list"
            currentTab={currentTabValue}
            handleChange={handleTabChange}
            ariaLabel="Вкладки форм для партнеров"
            items={tabs}
          />

          <StyledPartnersPanels>
            {tabs.map(({ slug }) => (
              <TabPanelComponent
                key={slug}
                currentTab={currentTabValue}
                slug={slug}
              >
                {slug === 'doctors' && <DoctorsForm />}
                {slug === 'clinics' && <DynamicClinicForm />}
              </TabPanelComponent>
            ))}
          </StyledPartnersPanels>
        </StyledPartnersPageTabs>
      </StyledPartnersPageWrapper>
    </ContainerComponent>
  );
};
