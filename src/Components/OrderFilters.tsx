import { useNavigate, useParams } from "react-router-dom";
import qs from "query-string";
import { useCallback, useEffect, useState } from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "react-datetime-picker";
import { Switch } from "./ui/switch";

const FormSchema = z.object({
  status: z.string().min(1),
  isPaid: z.boolean(),
});

const OrderFilters = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [status, setStatus] = useState<string | null>(null);
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    const queryParameters = qs.parse(location.search) as Record<
      string,
      string | null
    >;
    console.log(queryParameters);
    setIsPaid(queryParameters.isPaid === "true" ? true : false);
    setStatus(queryParameters.status || null);
    //   setAppointment(queryParameters.appointment || null);
  }, [location.search]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const handleSwitchClick = (value: boolean) => {
    setIsPaid(!value);
  };

  const onSubmit = useCallback(async () => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      isPaid,
      status,
      appointment,
    };

    const url = qs.stringifyUrl(
      {
        url: "/dashboard",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    navigate(url);
  }, [navigate, isPaid, status, appointment, params]);

  return (
    <div className="absolute h-full  ">
      <div className="bg-white p-4 rounded-lg shadow-md ">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="space-y-2">
          <div className="flex items-center">
            <p className="text-3xl"> Pago</p>
            <Switch
                onCheckedChange={(value) => handleSwitchClick(!value)}
              checked={isPaid as boolean}
            />
          </div>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={(newValue) => {
                        field.onChange(newValue);
                        setStatus(newValue);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={status ? status : "status"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Preparando pedido">
                          Preparando pedido
                        </SelectItem>
                        <SelectItem value="Saiu para entrega">
                          Saiu para entrega
                        </SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex items-center">
            <label htmlFor="appointmentFilter" className="text-sm mr-2">
              Para:
            </label>
            <DateTimePicker value={appointment} />
          </div>
        </div>

        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={onSubmit}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
