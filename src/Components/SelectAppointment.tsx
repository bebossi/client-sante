import { useEffect, useState } from "react";
import { AvailiableAppointment } from "../interfaces";
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
  handleAvailiableAppointmentId?: (avaliableAppointmentId: string) => void;
  handleIsSelectOpen?: () => void;
}

const FormSchema = z.object({
  avaliableAppointmentId: z.string().min(1),
});

const SelectAppointment: React.FC<AppointmentInfoProps> = ({handleAvailiableAppointmentId}) => {
  const [avaliableAppointments, setAvaliableAppointments] =
    useState<AvailiableAppointment[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fecthAppointments = async () => {
      try {
        const response = await api.get("/getAppointments");
        setAvaliableAppointments(response.data);
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
          {avaliableAppointments?.map((avaliableAppointment) => (
            <p key={avaliableAppointment.id} className="text-lg font-semibold">
              {new Date(avaliableAppointment.startDate).toLocaleString(
                "pt-BR",
                {
                  timeZone: "America/Sao_Paulo",
                  dateStyle: "short",
                  timeStyle: "short",
                }
              )}
              - {avaliableAppointment.endTime}
            </p>
          ))}
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
                      handleAvailiableAppointmentId!(newValue);
                      field.onChange(newValue);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an appointment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {avaliableAppointments?.map((avaliableAppointment) => (
                        <SelectItem value={avaliableAppointment.id}>
                          <p
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
