import { useEffect, useState } from "react";
import { DataTable } from "../../Components/DataTable/Data-table";
import { api } from "../../api";
import { Product } from "../../interfaces";
import { columns } from "./columns";
import { Button } from "../../Components/ui/button";
import { cn } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const DashboardProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/getProducts");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  if (!products) {
    return <div>No Products</div>;
  }

  return (
    <>
      <Button
        className={cn(" mx-5 bg-red-500 mt-5 ")}
        onClick={() => navigate("/product")}
      >
        Add new product
      </Button>
      <DataTable columns={columns} data={products ?? []} searchKey={"name"} />
    </>
  );
};

export default DashboardProduct;
