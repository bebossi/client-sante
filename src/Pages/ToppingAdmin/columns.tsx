import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import {    Product,    Topping } from "../../interfaces";

export type ToppingColumn = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  productId?: string;
  product: Product;
}; 

export const columns: ColumnDef<Topping>[] = [

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
    accessorKey: "product.name",
    header: "Product",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];