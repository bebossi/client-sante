import { useContext, useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { api } from '../api';
import Button from '../Components/Button';
import { format } from 'date-fns-tz';
import toast from 'react-hot-toast';
import SelectAppointment from '../Components/SelectAppointment';
import { UserContext } from '../Contexts/currentUser';
import { Switch } from '../Components/ui/switch';
import { RestaurantContext } from '../Contexts/restaurantContext';

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentsPage = () => {
  const [valueTime, onChangeTime] = useState<Value>(new Date());
  const [endTime, setOnEndTime] = useState<Value>(new Date());
  const { user } = useContext(UserContext)!;
  const restaurantContext = useContext(RestaurantContext);
  const isRestaurantOpen = restaurantContext?.isRestaurantOpen;

  useEffect(() => {}, [isRestaurantOpen]);
  if (user && user.role !== 'admin') {
    return <div>Você não tem acesso à essa pagina</div>;
  }

  const onSubmit = async () => {
    try {
      const formattedDate = format(
        valueTime as Date,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
        {
          timeZone: 'America/Sao_Paulo',
        }
      );
      const formattedEndTime = format(endTime as Date, 'HH:mm:ss', {
        timeZone: 'America/Sao_Paulo',
      });
      await api.post('/createAppointment', {
        startDate: formattedDate,
        endTime: formattedEndTime,
      });
      toast.success('Horário criado');
    } catch (err) {
      toast.error('Algo deu errado');
      console.log(err);
    }
  };

  const handleIsOpen = async () => {
    try {
      await api.put('/updateIsOpen');
      toast.success('Atualizado');
    } catch (err) {
      toast.error('Algo deu errado');
      console.log(err);
    }
  };

  return (
    <div
      data-cy="appointment-page"
      className="flex flex-col justify-center mt-10 p-3 space-y-3 "
    >
      <div>
        <p className="text-4xl font-semibold my-5">
          O restaurante está aberto?
        </p>
        <div>
          <Switch
            data-cy="updateIsOpen"
            checked={isRestaurantOpen!}
            onCheckedChange={handleIsOpen}
          />
        </div>
      </div>
      <p className="text-2xl font-semibold py-4">
        Slecione uma data e um horário
      </p>
      <DateTimePicker
        data-cy="date-time"
        amPmAriaLabel="false"
        onChange={onChangeTime}
        value={valueTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
      />
      <p className="text-2xl font-semibold">
        Selecione apenas o horario, na mesma data
      </p>
      <DateTimePicker
        amPmAriaLabel="false"
        isCalendarOpen={true}
        onChange={setOnEndTime}
        value={endTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
        disableCalendar
        minDate={valueTime as Date}
      />
      <Button
        label="Crie um horário para busca e delivery"
        onClick={onSubmit}
      ></Button>
      <p>Todos horários criados</p>
      <SelectAppointment />
    </div>
  );
};

export default AppointmentsPage;
