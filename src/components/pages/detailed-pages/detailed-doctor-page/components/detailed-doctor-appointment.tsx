import {
  TabPanelComponent,
  TabsListComponent,
  Timetable,
  useTabs,
} from '@/components';
import { IDoctor, ITabItem, SelectedSlot } from '@/shared/types';
import { StyledDoctorAppointments } from './styled-components';

interface Props {
  data: IDoctor;
  tabsList: ITabItem[];
  openAppointmentDialog: (slot?: SelectedSlot) => void;
}

export const DetailedDoctorAppointment = ({
  data,
  tabsList,
  openAppointmentDialog,
}: Props): JSX.Element => {
  const { currentTabValue, handleTabChange } = useTabs({ tabsList });

  return (
    <StyledDoctorAppointments>
      <TabsListComponent
        items={tabsList}
        currentTab={currentTabValue}
        handleChange={handleTabChange}
        ariaLabel="Вкладки онлайн записи к врачу"
        itemsLengthThreshold={2}
        className="doctor-appointments-tabs"
        small
      />
      {data.rnovaId && (
        <TabPanelComponent slug="online" currentTab={currentTabValue}>
          <div className="appointments-wrapper">
            <Timetable
              docId={data.rnovaId}
              openAppointmentDialog={openAppointmentDialog}
            />
          </div>
        </TabPanelComponent>
      )}
      <TabPanelComponent slug="office" currentTab={currentTabValue}>
        Office Appointments
      </TabPanelComponent>
      <TabPanelComponent slug="home" currentTab={currentTabValue}>
        Home Appointments
      </TabPanelComponent>
    </StyledDoctorAppointments>
  );
};
