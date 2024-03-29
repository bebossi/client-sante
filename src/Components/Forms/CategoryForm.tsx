import { api } from '../../api';
import {
  Separator,
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui';
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { Category } from '../../interfaces';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import Heading from '../Heading';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Editar categoria' : 'Criar categoria';
  const description = initialData ? 'Editar categoria' : 'Adicione uma categoria';
  const toastMessage = initialData ? 'Categoria atualizada' : 'Categoria criada';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
        },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);

      if (initialData) {
        await api.put(`/updateCategory/${initialData.id}`, data);
        toast.success(toastMessage);
      } else {
        await api.post(`/createCategory`, data);
        toast.success(toastMessage);
      }

      navigate('/dashboardOverview');
    } catch (err) {
      toast.error('Algo deu errado');
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Nome categoria" {...field} />
                  </FormControl>
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
    </div>
  );
};

export default CategoryForm;
