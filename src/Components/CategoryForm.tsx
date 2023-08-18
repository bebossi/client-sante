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
import { Category } from "../interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Heading from "../Components/Heading";
import { useNavigate, useParams } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const navigate = useNavigate();
  if (!initialData) {
    return <div>Loading...</div>;
  }

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit product" : "Add a new product";
  const toastMessage = initialData ? "Product updated" : "Product created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: "",
        },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (initialData) {
        await api.put(`/updateCategory/${params.categoryId}`, data);
        toast.success(toastMessage);
      } else {
        await api.post(`/create`, data);
        toast.success(toastMessage);
      }

      toast.success(toastMessage);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      //   disabled={loading}
                      placeholder="Prouct name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            //    disabled={loading}
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
