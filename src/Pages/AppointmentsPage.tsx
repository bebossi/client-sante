import {  useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { api } from "../api";
import Button from "../Components/Button";
import { format } from "date-fns-tz";
import toast from "react-hot-toast";
import SelectAppointment from "../Components/SelectAppointment";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const AppointmentsPage = () => {
  const [valueTime, onChangeTime] = useState<Value>(new Date());
  const [endTime, setOnEndTime] = useState<Value>(new Date());

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

      toast.success("Avaliable appointment was created");
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-10 p-3 space-y-3">
      <p className="text-lg font-semibold">Set Start Date with Time</p>
      <DateTimePicker
        amPmAriaLabel="false"
        onChange={onChangeTime}
        value={valueTime}
        hourPlaceholder="hh"
        minutePlaceholder="mm"
      />
      <p className="text-lg font-semibold">Set Only End Time</p>
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
      <Button label="Create avaliable appoitment" onClick={onSubmit}></Button>
      <p>All Appointments</p>
      <SelectAppointment/>
    </div>
  );
};

export default AppointmentsPage;
