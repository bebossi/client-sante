import { Address, User } from "../../interfaces";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SelectAddressProps {
  user: User;
  handleAddressId: (addressId: string) => void;
  handleIsSelectOpen: () => void
}

const FormSchema = z.object({
  addressId: z.string().min(1),
});

const SelectAddress: React.FC<SelectAddressProps> = ({
  user,
  handleAddressId,
  handleIsSelectOpen
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
                onOpenChange={ handleIsSelectOpen}
                  onValueChange={(newValue) => {
                    handleAddressId(newValue);
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