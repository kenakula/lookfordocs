import { useState } from 'react';
import { Typography } from '@mui/material';
import {
  ContainerComponent,
  TabPanelComponent,
  TabsListComponent,
} from '@/components';
import { ITabItem } from '@/shared/types';
import { Title } from '@/shared/assets';
import {
  ClinicsForm,
  DoctorsForm,
  StyledPartnersPageTabs,
  StyledPartnersPageWrapper,
  StyledPartnersPanels,
} from './components';

const PAGE_TABS: ITabItem[] = [
  {
    label: 'Для докторов',
  },
  {
    label: 'Для клиник',
  },
];

// TODO динамический рендеринг содержимого табов

export const PartnersPage = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, tab: number) => {
    setCurrentTab(tab);
  };

  return (
    <ContainerComponent>
      <StyledPartnersPageWrapper>
        <Title variant="h1" textAlign="center">
          Докторам и Клиникам
        </Title>
        {/* TODO перенести тексты в CMS */}
        <Typography textAlign="center">
          Если вы хотите с нами сотрудничать, заполните форму
        </Typography>
        <StyledPartnersPageTabs>
          <TabsListComponent
            className="partners-tabs-list"
            currentTab={currentTab}
            handleChange={handleTabChange}
            ariaLabel="Вкладки форм для партнеров"
            items={PAGE_TABS}
          />

          <StyledPartnersPanels>
            <TabPanelComponent currentTab={currentTab} index={0}>
              <DoctorsForm />
            </TabPanelComponent>
            <TabPanelComponent currentTab={currentTab} index={1}>
              <ClinicsForm />
            </TabPanelComponent>
          </StyledPartnersPanels>
        </StyledPartnersPageTabs>
      </StyledPartnersPageWrapper>
    </ContainerComponent>
  );
};
