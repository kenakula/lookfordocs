import { IDoctor, SelectedSlot } from '@/shared/types';
import { StyledDoctorAppointments } from './styled-components';
import { TabPanelComponent, TabsListComponent } from '@/components/tabs';
import { useGetDoctorAppointmentTabs } from '../hooks';
import { Timetable } from '@/components';

interface Props {
  data: IDoctor;
  openAppointmentDialog: (slot?: SelectedSlot) => void;
}

export const DetailedDoctorAppointment = ({
  data,
  openAppointmentDialog,
}: Props): JSX.Element => {
  const { tabItems, currentTabId, changeCurrentTab } =
    useGetDoctorAppointmentTabs({ data });

  return (
    <StyledDoctorAppointments>
      <TabsListComponent
        items={tabItems}
        currentTab={currentTabId}
        handleChange={changeCurrentTab}
        ariaLabel="Вкладки онлайн записи к врачу"
        itemsLengthThreshold={2}
        className="doctor-appointments-tabs"
        small
      />
      {data.rnovaId && (
        <TabPanelComponent index={0} currentTab={currentTabId}>
          <div className="appointments-wrapper">
            <Timetable
              docId={data.rnovaId}
              openAppointmentDialog={openAppointmentDialog}
            />
          </div>
        </TabPanelComponent>
      )}
      <TabPanelComponent index={1} currentTab={currentTabId}>
        Tab2
      </TabPanelComponent>
      <TabPanelComponent index={2} currentTab={currentTabId}>
        Tab3
      </TabPanelComponent>
    </StyledDoctorAppointments>
  );
};
