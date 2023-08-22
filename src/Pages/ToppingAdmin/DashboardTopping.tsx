import { useEffect, useState } from "react";
import { DataTable } from "../../Components/DataTable/Data-table";
import { api } from "../../api";
import { Topping } from "../../interfaces";
import { columns } from "./columns";
import { cn } from "../../lib/utils";
import { Button } from "../../Components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardToppings = () => {
  const navigate = useNavigate();

  const [toppings, setToppings] = useState<Topping[] | null>(null);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await api.get("/getToppings");
        setToppings(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchToppings();
  }, []);

  return (
    <>
      <Button
        className={cn(" mx-5 bg-red-500 mt-5 ")}
        onClick={() => navigate("/topping")}
      >
        Add new topping
      </Button>
      <DataTable columns={columns} data={toppings ?? []} searchKey={"name"} />
    </>
  );
};

export default DashboardToppings;
