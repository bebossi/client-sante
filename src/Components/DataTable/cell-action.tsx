import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../../Components/ui/dropdown-menu";
import { ProductColumn } from "./columns"
import { Button } from "../../Components/ui/button";
import { Edit, MoreHorizontalIcon, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";

interface CellActionProps {
    data: ProductColumn;

}
export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const navigate = useNavigate()

    const onDelete = async () => {
        try {
    
          await api.delete(`/delete`);
          toast.success("Product deleted");
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
                    <MoreHorizontalIcon className="h-4 w-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate(`/products/${data.id}`)} >
                    <Edit className="mr-2 h-4 w-4" />
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete} >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}