import { Address, User } from '../../interfaces';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface SelectAddressProps {
  user: User;
  handleAddress: (addressId: string, selectedAddress?: Address) => void;
  toggleIsSelectOpen: () => void;
}

const FormSchema = z.object({
  addressId: z.string().min(1),
});

const SelectAddress: React.FC<SelectAddressProps> = ({
  user,
  handleAddress,
  toggleIsSelectOpen,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <>
      <Form {...form}>
        <form className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="addressId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <Select
                  onOpenChange={toggleIsSelectOpen}
                  onValueChange={(newValue) => {
                    const address = user.addresses?.find((address) => {
                      return address.id === newValue;
                    });
                    handleAddress!(newValue, address!);
                    field.onChange(newValue);
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um endereçado salvo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {user.addresses.map((address: Address) => (
                      <SelectItem key={address.id} value={address.id}>
                        {address.street}, {address.streetNumber}, apto
                        {address.complementNumber} - {address.neighborhood}. CEP
                        {address.CEP}.
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
    </>
  );
};

export default SelectAddress;
