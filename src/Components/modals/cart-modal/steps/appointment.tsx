import { AvaliableAppointment } from '../../../../interfaces';
import SelectAppointment from '../../../SelectAppointment';
interface AppointmentProps {
  handleAvailiableAppointment: (
    avaliableAppointmentId: string,
    appointment?: AvaliableAppointment
  ) => void;
}
export const Appointment: React.FC<AppointmentProps> = ({
  handleAvailiableAppointment,
}) => {
  return (
    <div className="flex flex-col  gap-3">
      <h1 className="text-2xl ">Selecione um horário para buscar</h1>
      <SelectAppointment handleAvailiableAppointment={handleAvailiableAppointment} />
    </div>
  );
};

export default Appointment;
