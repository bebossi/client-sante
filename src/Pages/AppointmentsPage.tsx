import {  useContext, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { api } from "../api";
import Button from "../Components/Button";
import { format } from "date-fns-tz";
import toast from "react-hot-toast";
import SelectAppointment from "../Components/SelectAppointment";
import { UserContext } from "../auth/currentUser";
// import useRestaurantIsOpen from "../hooks/useRestaurantIsOpen";
import { Switch } from "../Components/ui/switch"
import { isRestaurantOpen } from "../interfaces";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentsPage = () => {
  const [valueTime, onChangeTime] = useState<Value>(new Date());
  const [endTime, setOnEndTime] = useState<Value>(new Date());
  const [isOpen, setIsOpen] = useState<isRestaurantOpen>()
  const {user} = useContext(UserContext)
  // const restaurantIsOpen = useRestaurantIsOpen()

  if(user && user.role !== "admin") {
    return (
      <div>Você não tem acesso à essa pagina</div>
    )
  }

  useEffect(() => {
    const fecthIsOpen = async () => {
      try{
        const response = await api.get("/getIsOpen")

        setIsOpen(response.data)
      } catch(err){
        console.log(err)
        toast.error("Algo deu errado")
      }
    }
    fecthIsOpen()
  }, [isOpen]);

  const onSubmit = async () => {
    try {
      const formattedDate = format(
        valueTime as Date,
        "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
        {
          timeZone: "America/Sao_Paulo",
        }
      );
      const formattedEndTime = format(endTime as Date, "HH:mm:ss", {
        timeZone: "America/Sao_Paulo",
      });
      await api.post("/createAppointment", {
        startDate: formattedDate,
        endTime: formattedEndTime,
      });
      toast.success("Horário criado");
    } catch (err) {
      toast.error("Algo deu errado");
      console.log(err);
    }
  };
  
  const handleIsOpen = async () => {
    try{
     const response = await api.put("/updateIsOpen")
      console.log(response.data)
    } catch(err){
      toast.error("Algo deu errado");
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col justify-center mt-10 p-3 space-y-3">
      <div>
        <p>O restaurante está aberto?</p>
        <div>
        {/* <Switch checked={restaurantIsOpen.isOpen} onCheckedChange={restaurantIsOpen.toggleOpen} /> */}
      <Switch checked={isOpen?.isOpen} onCheckedChange={handleIsOpen} />
        </div>
      </div>
      <p className="text-lg font-semibold">Slecione uma data e um horário</p>
      <DateTimePicker
        amPmAriaLabel="false"
        onChange={onChangeTime}
        value={valueTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
      />
      <p className="text-lg font-semibold">Selecione apenas o horario, na mesma data</p>
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
      <Button label="Crie um horário para busca e delivery" onClick={onSubmit}></Button>
      <p>Todos horários criados</p>
      <SelectAppointment/>
    </div>
  );
};

export default AppointmentsPage;
