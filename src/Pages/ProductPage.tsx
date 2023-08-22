import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import ProductForm from "../Components/productForm";
import { Category, Product } from "../interfaces";

const ProductPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fetchingProduct, setFetchingProduct] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/getProduct/${params.productId}`);
        setProduct(response.data);
        setFetchingProduct(false);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get("/getCategories");

        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
    if (params.productId) {
      fetchProduct();
    } else {
      setFetchingProduct(false);
    }
  }, []);

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
