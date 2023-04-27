import { TabPanelComponent, TabsListComponent, Timetable } from '@/components';
import { IDoctor, SelectedSlot } from '@/shared/types';
import { StyledDoctorAppointments } from './styled-components';
import { useGetDoctorAppointmentTabs } from '../hooks';

interface Props {
  data: IDoctor;
  openAppointmentDialog: (slot?: SelectedSlot) => void;
}

export const DetailedDoctorAppointment = ({
  data,
  openAppointmentDialog,
}: Props): JSX.Element => {
  const { tabsList, currentTabValue, handleTabChange } =
    useGetDoctorAppointmentTabs({ data });

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
