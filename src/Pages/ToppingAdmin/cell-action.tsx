import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Button,
} from '../../Components/ui';
import { ToppingColumn } from './columns';
import { Edit, MoreHorizontalIcon, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../../api';
import { useNavigate } from 'react-router-dom';

interface CellActionProps {
  data: ToppingColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();

  const onDelete = async (id: string) => {
    try {
      await api.delete(`/deleteTopping`, {
        data: {
          toppingId: id,
        },
      });
      toast.success('Topping deletado');
    } catch (err) {
      toast.error('Algo deu errado');
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abra</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/topping/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Atualizar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(data.id)}>
            <Trash className="mr-2 h-4 w-4" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
