import { useEffect, useState } from "react";
import { AvaliableAppointment } from "../interfaces";
import { api } from "../api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface AppointmentInfoProps {
  handleAvailiableAppointmentId?: (
    avaliableAppointmentId: string,
    appointment?: AvaliableAppointment
  ) => void;
  handleIsSelectOpen?: () => void;
}

const FormSchema = z.object({
  avaliableAppointmentId: z.string().min(1),
});

const SelectAppointment: React.FC<AppointmentInfoProps> = ({
  handleAvailiableAppointmentId,
}) => {
  const [avaliableAppointments, setAvaliableAppointments] =
    useState<AvaliableAppointment[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

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
    <div className="flex flex-col justify-center gap-2">
      {window.location.pathname === "/appointment" ? (
        <>
          <ul className="space-y-4">
            {avaliableAppointments?.map((avaliableAppointment) => (
              <li
                key={avaliableAppointment.id}
                className="p-4 bg-white rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 flex items-center"
              >
                <span className="text-xl font-semibold text-blue-500">
                  {new Date(avaliableAppointment.startDate).toLocaleString(
                    "pt-BR",
                    {
                      timeZone: "America/Sao_Paulo",
                      dateStyle: "short",
                      timeStyle: "short",
                    }
                  )}
                </span>
                <span className="mx-2 text-gray-500">-</span>
                <span className="text-xl font-semibold text-red-500">
                  {avaliableAppointment.endTime}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Form {...form}>
          <form className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="avaliableAppointmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de agendamento </FormLabel>
                  <Select
                    // onOpenChange={handleIsSelectOpen}
                    onValueChange={(newValue) => {
                      const avaliableAppointment = avaliableAppointments?.find(
                        (availableAppointment) => {
                          return availableAppointment.id === newValue;
                        }
                      );
                      handleAvailiableAppointmentId!(
                        newValue,
                        avaliableAppointment
                      );
                      field.onChange(newValue);
                    }}
                    value={field.value}
                  >
                    <FormControl data-cy="appointments">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an appointment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {avaliableAppointments?.map((avaliableAppointment) => (
                        <SelectItem
                          key={avaliableAppointment.id}
                          value={avaliableAppointment.id}
                        >
                          <p
                            data-cy="appointment"
                            key={avaliableAppointment.id}
                            className="text-lg font-semibold"
                          >
                            {new Date(
                              avaliableAppointment.startDate
                            ).toLocaleString("pt-BR", {
                              timeZone: "America/Sao_Paulo",
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                            - {avaliableAppointment.endTime}
                          </p>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
};

export default SelectAppointment;
