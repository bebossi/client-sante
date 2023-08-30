import { api } from "../api";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../Components/ui/form";
import * as z from "zod";
import { Product, Topping } from "../interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Heading from "../Components/Heading";
import ImageUpload from "./image-upload";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  price: z.coerce.number().min(1),
  productId: z.string().min(1),
});

type ToppingFormValues = z.infer<typeof formSchema>;

interface ToppingFormProps {
  initialData: Topping | null;
  products: Product[] ;
}

const ToppingForm: React.FC<ToppingFormProps> = ({ initialData, products }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if (!initialData && !products) {
    return <div>Loading...</div>;
  }

  const title = initialData ? "Editar topping" : "Criar topping";
  const description = initialData ? "Editar topping" : "Adicionar topping";
  const toastMessage = initialData ? "Topping atualizado" : "Topping criado";
  const action = initialData ? "Salvar mudanças" : "Criar";

  const form = useForm<ToppingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
          description: "",
          image: "",
          price: 0,
          productId: "",
        },
  });

  const onSubmit = async (data: ToppingFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await api.put(`/updateTopping/${initialData.id}`, data);
        toast.success(toastMessage);
      } else {
        await api.post(`/createTopping`, data);
        toast.success(toastMessage);
      }

      toast.success(toastMessage);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="p-1">
      <div className="flex items-center justify-between ">
        <Heading title={title} subtitle={description} />
        {initialData && (
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div>
                <FormItem className="w-1/3">
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                        disabled={loading}
                      placeholder="Prouct name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <textarea
                      className="h-20 line-clamp-4 w-full border-slate-200 border-[1px] rounded-md overflow-y-auto"
                        disabled={loading}
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                        disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[1px] h-auto w-auto">
                        <SelectValue
                          className=""
                          defaultValue={field.value}
                          placeholder="Select a product"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Produtos</SelectLabel>
                        {products?.map((product) => (
                          <SelectItem key={product.id} value={product.id}>
                            {product.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
               disabled={loading}
            className="ml-auto py-5"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ToppingForm;
