import { AvaliableAppointment } from '../../../../interfaces';
import SelectAppointment from '../../../SelectAppointment';
interface AppointmentProps {
  handleAvailiableAppointmentId: (
    avaliableAppointmentId: string,
    appointment?: AvaliableAppointment
  ) => void;
}
export const Appointment: React.FC<AppointmentProps> = ({
  handleAvailiableAppointmentId,
}) => {
  return (
    <div className="flex flex-col  gap-3">
      <h1 className="text-2xl ">Selecione um horário para buscar</h1>
      <SelectAppointment handleAvailiableAppointmentId={handleAvailiableAppointmentId} />
    </div>
  );
};

export default Appointment;
