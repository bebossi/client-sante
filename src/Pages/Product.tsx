import { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { api } from "../api";
import ProductForm from "../Components/productForm";
import { Product } from "../interfaces";

const ProductPage = () => {
  const params = useParams()
 

  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/getProduct/${params.productId}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

 

  return (
    <>
     <ProductForm initialData={product}
    //   categoryId={product?.categoryId!} 
      />
    </>
  );
};

export default ProductPage;
