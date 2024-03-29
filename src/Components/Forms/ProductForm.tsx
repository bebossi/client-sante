import { api } from '../../api';
import { Trash } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Button,
  Input,
} from '../ui';
import * as z from 'zod';
import { Category, Product } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Heading from '../Heading';
import ImageUpload from '../image-upload';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: Product | null;
  categories: Category[];
}
const ProductForm: React.FC<ProductFormProps> = ({ initialData, categories }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Editar produto' : 'Criar produto';
  const description = initialData ? 'Editar produto' : 'Adicione um produto';
  const toastMessage = initialData ? 'Produto atualizado' : 'Produto criado';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
          description: '',
          image: '',
          price: 0,
          categoryId: '',
        },
  });

  if (!initialData && !categories) {
    return <div>Loading</div>;
  }

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await api.put(`/updateProduct/${initialData.id}`, data);
        toast.success(toastMessage);
      } else {
        await api.post(`/create`, data);
        toast.success(toastMessage);
      }
      navigate('/dashboardOverview');
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} subtitle={description} />
        {initialData && (
          <Button variant="destructive" size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div>
                <FormItem className="w-1/3">
                  <FormLabel>Imagem</FormLabel>
                  <FormControl>
                    <ImageUpload value={field.value} onChange={field.onChange} />
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
                    <Input disabled={loading} placeholder="Prouct name" {...field} />
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[1px]">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="">
                      <SelectGroup>
                        <SelectLabel>Categorias</SelectLabel>
                        {categories?.map((category) => (
                          <SelectItem
                            data-cy={category.name}
                            key={category.id}
                            value={category.id}
                          >
                            {category.name}
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
            data-cy="submit"
            disabled={loading}
            className="ml-auto py-5"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
