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
    header: "Nome",
  },

  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "product.name",
    header: "Produto",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];