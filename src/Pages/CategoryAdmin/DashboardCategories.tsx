import { useEffect, useState } from "react";
import { DataTable } from "../../Components/DataTable/Data-table";
import { api } from "../../api";
import { Category } from "../../interfaces";
import { columns } from "../CategoryAdmin/columns";
import { Button } from "../../Components/ui/button";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const DashboardCategories = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    const fetchCategores = async () => {
      try {
        const response = await api.get("/getCategories");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategores();
  }, []);

  return (
    <>
      <Button
        className={cn(" mx-5 bg-red-500 mt-5 ")}
        onClick={() => navigate("/category")}
      >
        Add new category
      </Button>
      <DataTable columns={columns} data={categories ?? []} searchKey={"name"} />
    </>
  );
};

export default DashboardCategories;
