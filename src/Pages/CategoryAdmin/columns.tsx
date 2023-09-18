import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "../CategoryAdmin/cell-action";
import { Category } from "../../interfaces";

export type CategoryColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
