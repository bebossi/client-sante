import { useEffect, useState } from "react";
import Container from "../Components/Container";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import React from "react";
import { Product } from "../interfaces";

const MenuPage = () => {
  const addCartModal = useAddToCartModal();
  const [products, setProducts] = useState<Product[]>();

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

  const handleProductClick = (product: Product) => {
    addCartModal.onOpen(product); 
  };

  return (
    <Container>
      <div className="flex flex-col items-center md:border-2 sm:mx-2 md:mx-8 lg:mx-16 xl:mx-80">
        {products?.map((product) => (
          <React.Fragment key={product.id}>
            <div
              className="flex w-full m-4 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="md:flex-1 sm:flex-1 mx-3">
                <h2
                  className="text-xl font-semibold"
                >
                  {product.name}
                </h2>
                <p className="text-gray-600 mr-4">
                  {product.description}
                </p>
                <p className="text-lg font-bold mt-2">R${product.price}</p>
              </div>
              <div className=" flex items-center min-w-max ">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg mr-3"
                />
              </div>
              <hr className="h-1" />
            </div>
            <hr className="w-full h-0.5" />
          </React.Fragment>
        ))}
      </div>
    </Container>
  );
};

export default MenuPage;
