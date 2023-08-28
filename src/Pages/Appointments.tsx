import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { api } from "../api";
import Button from "../Components/Button";
import { AvailiableAppointment } from "../interfaces";
import { format } from "date-fns-tz";
import toast from "react-hot-toast";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const Appointments = () => {
  const [valueTime, onChangeTime] = useState<Value>(new Date());
  const [endTime, setOnEndTime] = useState<Value>(new Date());

  const [avaliableAppointments, setAvaliableAppointments] =
    useState<AvailiableAppointment[]>();
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

      toast.success("Avaliable appointment was created")
    } catch (err) {
      toast.error("Something went wrong")
      console.log(err);
    }
  };

  useEffect(() => {
    const fecthAppointments = async () => {
      try {
        const response = await api.get("/getAppointments");
        setAvaliableAppointments(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAppointments();
  }, []);

  return (
    <div className="flex flex-col justify-center mt-80 p-3 gap-3 ">
      <p>Set Start Date with time</p>
      <DateTimePicker
        amPmAriaLabel="false"
        isCalendarOpen={true}
        onChange={onChangeTime}
        value={valueTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
      />
      <p>Set only end time</p>
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
      <Button label="Create avaliable appointment" onClick={onSubmit}></Button>
      {avaliableAppointments?.map((avaliableAppointment) => (
        <p key={avaliableAppointment.id}>
          {new Date(avaliableAppointment.startDate).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          })}{" "}
          - {avaliableAppointment.endTime}
        </p>
      ))}
    </div>
  );
};

export default Appointments;
