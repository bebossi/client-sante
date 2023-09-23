import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import ToppingForm from "../Components/Forms/ToppingForm";
import { Product, Topping } from "../interfaces";

const ToppingPage = () => {
  const params = useParams();
  const [topping, setTopping] = useState<Topping | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingTopping, setFetchingTopping] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, toppingResponse] = await Promise.all([
          api.get("/getProducts"),
          params.toppingId
            ? api.get(`/getTopping/${params.toppingId}`)
            : Promise.resolve(null),
        ]);

        setProducts(productsResponse.data);

        if (params.toppingId) {
          setTopping(toppingResponse?.data);
        }

        setFetchingTopping(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [params.toppingId]);

  return (
    <>
      {fetchingTopping ? (
        <p>Loading...</p>
      ) : (
        <ToppingForm initialData={topping} products={products} />
      )}
    </>
  );
};

export default ToppingPage;
