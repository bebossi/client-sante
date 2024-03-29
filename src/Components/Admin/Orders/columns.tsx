import { ColumnDef } from '@tanstack/react-table';
import { Address, AvaliableAppointment, User } from '../../../interfaces';
import { CellAction } from './cell-action';

export type OrderColumn = {
  id: string;
  total: number;
  createdAt: Date;
  address: Address;
  user: User;
  isPaid: boolean;
  avaliableAppointment: AvaliableAppointment;
  status: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'total',
    header: 'Total',
  },
  {
    accessorKey: 'isPaid',
    header: 'Pago',
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Data</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      const formatted = new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
