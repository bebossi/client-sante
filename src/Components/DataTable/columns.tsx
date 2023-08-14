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
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];