import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { OrderColumn } from "./columns";
import { Button } from "../../Components/ui/button";
import { Edit, MoreHorizontalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: OrderColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();

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
          <DropdownMenuItem onClick={() => navigate(`/order/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Veja o pedido
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
