import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../Components/ui/dropdown-menu";
import { CategoryColumn } from "./columns";
import { Button } from "../../Components/ui/button";
import { Edit, MoreHorizontalIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
  data: CategoryColumn;
}
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const navigate = useNavigate();

  const onDelete = async (id: string) => {
    try {
     await api.delete(`/deleteCategory`, {
        data: {
          categoryId: id,
        },
      });
      toast.success("Category deleted");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigate(`/category/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(data.id)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
