import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import { useCallback, useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker from 'react-datetime-picker';
import { Switch } from './ui/switch';
import { Value } from '../Pages/AppointmentsPage';
import { Separator } from './ui/separator';

const FormSchema = z.object({
  status: z.string().min(1),
  isPaid: z.boolean(),
});

const OrderFilters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const params = useParams();
  const [isPaid, setIsPaid] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [appointment, setAppointment] = useState<Value | null>();

  useEffect(() => {
    const queryParameters = qs.parse(location.search) as Record<
      string,
      string | null
    >;

    setIsPaid(queryParameters.isPaid === 'true' ? true : null);
    setStatus(queryParameters.status || null);
    setAppointment((queryParameters.appointment as Value) || null);
  }, [location.search]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const handleSwitchClick = (value: boolean) => {
    setIsPaid(!value);
  };

  const onSubmit = useCallback(async () => {
    const queryParameters = qs.parse(location.search) as Record<
      string,
      string | null
    >;

    const updatedQuery: {
      isPaid?: string;
      status?: string | undefined;
      appointment?: string;
      [key: string]: string | undefined;
    } = {
      ...queryParameters,
      isPaid: isPaid !== null ? isPaid.toString() : undefined,
      status: status !== null ? status.toString() : undefined,
      appointment: appointment ? appointment.toString() : undefined,
    };

    if (isPaid === null) {
      delete updatedQuery.isPaid;
    }

    const url = qs.stringifyUrl(
      {
        url: location.pathname,
        query: updatedQuery,
      },
      { skipNull: true }
    );
    navigate(url);
  }, [navigate, isPaid, status, appointment, location]);

  const handleResetFilters = () => {
    setIsPaid(false);
    setStatus(null);
    setAppointment(undefined);

    navigate(location.pathname);
  };

  return (
    <div className="absolute h-full bg-white rounded-lg shadow-md border-[1px] p-2 pl-3 ml-1">
      <h2 className="text-4xl font-semibold mb-6">Filters</h2>
      <Separator />
      <div className="space-y-2">
        <div className="flex items-center py-3">
          <p className="text-3xl mr-3"> Pago {''}</p>
          <Switch
            onCheckedChange={(value) => handleSwitchClick(!value)}
            checked={isPaid as boolean}
          />
        </div>
        <Separator />
        <div className="py-3">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-3xl dark:text-white lg:text-4xl leading-7 lg:leading-9">
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
                            placeholder={status ? status : 'status'}
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
        </div>
        <Separator />
        <div className="flex items-center py-3 ">
          <p className="text-3xl mr-3">Dia</p>
          <DateTimePicker
            value={appointment}
            onChange={setAppointment}
            disableClock
          />
        </div>
      </div>
      <Separator />

      <div>
        <button
          className="bg-blue-500 text-white font-semibold mx-2 px-4 py-2 mt-10 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={onSubmit}
        >
          Apply Filters
        </button>
        <button
          className="bg-gray-300 text-gray-600 font-semibold mx-2 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200"
          onClick={handleResetFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default OrderFilters;
