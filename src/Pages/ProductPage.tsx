import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { Category, Product } from "../interfaces";
import ProductForm from "../Components/Forms/ProductForm";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingProduct, setFetchingProduct] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse] = await Promise.all([
          api.get("/getCategories"),
          params.productId
            ? api.get(`/getProduct/${params.productId}`)
            : Promise.resolve(null),
        ]);

        setCategories(categoriesResponse.data);

        if (params.productId) {
          const productResponse = await api.get(
            `/getProduct/${params.productId}`
          );
          setProduct(productResponse.data);
        }

        setFetchingProduct(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [params.productId]);

  return (
    <>
      {fetchingProduct ? (
        <p>Loading...</p>
      ) : (
        <ProductForm initialData={product} categories={categories} />
      )}
    </>
  );
};

export default ProductPage;
