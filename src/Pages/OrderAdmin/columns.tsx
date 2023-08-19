import { ColumnDef } from "@tanstack/react-table";
import {   Address, User } from "../../interfaces";
import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
total: number;
createdAt: Date;
address: Address;
user: User;
}; 

export const columns: ColumnDef<OrderColumn>[] = [
//   {
//     accessorKey: "id",
//     header: "Id",
//   },
{
    accessorKey: `address.street`,
    header: "Address"
},
  {
    accessorKey: "total",
    header: "Total"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];