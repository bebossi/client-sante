import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import ProductForm from "../Components/productForm";
import { Category, Product } from "../interfaces";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productFetched, setProductFetched] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/getProduct/${params.productId}`);
        setProduct(response.data);
        setProductFetched(true);
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
    }
  }, []);
  return (
    <>
      {productFetched && (
        <ProductForm initialData={product} categories={categories} />
      )}
    </>
  );
};

export default ProductPage;
