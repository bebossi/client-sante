import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import ToppingForm from "../Components/ToppingForm";
import { Product, Topping } from "../interfaces";

const ToppingPage = () => {
  const params = useParams();
  const [topping, setTopping] = useState<Topping | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [toppingFetched, setToppingFetched] = useState(false);

  useEffect(() => {
    const fetchTopping = async () => {
      try {
        const response = await api.get(`/getTopping/${params.toppingId}`);
        setTopping(response.data);
        setToppingFetched(true);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get(`/getProducts`);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();

    fetchTopping();
    fetchProducts();
  }, [params.toppingId]);
  return (
    <>
      {toppingFetched && (
        <ToppingForm initialData={topping} products={products} />
      )}
    </>
  );
};

export default ToppingPage;
