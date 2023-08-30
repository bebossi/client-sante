import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { CartToProduct, Category, OrderToProduct,  Product,  Topping } from "../../interfaces";

export type ProductColumn = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  categoryId?: string;
  category: Category;
  cartProducts?: CartToProduct[];
  orderProducts?: OrderToProduct[];
  toppings?: Topping[];

  createdAt: Date;
  updatedAt?: Date;
}; 

export const columns: ColumnDef<Product>[] = [

  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "category.name",
    header: "Categoria",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];