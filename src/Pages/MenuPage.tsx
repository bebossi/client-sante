import { useEffect, useRef, useState } from "react";
import Container from "../Components/Container";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import React from "react";
import { Product, Category } from "../interfaces";

const MenuPage = () => {
  const addCartModal = useAddToCartModal();
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/getProducts");

        setProducts(response.data);
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
    fetchProducts();
    fetchCategories();
  }, []);

  const handleProductClick = (product: Product) => {
    addCartModal.onOpen(product);
  };

  // const goToProductsOfCategoryId = (categoryId: string) => {
  //   const categoryElement = document.getElementById(`category-${categoryId}`);
  //   if (categoryElement) {
  //     categoryElement.scrollIntoView({ behavior: "smooth", block: "start" , inline: "start"});
  //   }
  // };
  const goToProductsOfCategoryId = (categoryId: string) => {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    if (categoryElement) {
      setSelectedCategory(categoryId); // Update the selected category ID
      const headerOffset = 180;
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <div className="flex flex-col items-center md:border-2 sm:mx-2 md:mx-8 lg:mx-16 xl:mx-80 ">
        <div className="flex items-center justify-center gap-x-10 sticky w-full border-b-2 bg-white top-28 ">
          {categories?.map((category) => (
            <div key={category.id} className="">
              <p
                onClick={() => goToProductsOfCategoryId(category.id)}
                className={selectedCategory === category.id ? "border-b-2 border-blue-600" : ""}
              >
                {category.name}
              </p>
            </div>
          ))}
        </div>
        {categories?.map((category) => (
          <div
            id={`category-${category.id}`}
            className="w-full"
            key={category.id}
          >
            <h2 className="text-2xl font-semibold border-y-[1px] py-2 flex  items-center justify-center">
              {category.name}
            </h2>
            <div className="">
              {products
                ?.filter((product) => product.categoryId === category.id)
                .map((product) => (
                  <React.Fragment key={product.id}>
                    <div
                      className="flex w-full  p-2 cursor-pointer hover:bg-slate-200"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="md:flex-1 sm:flex-1 mx-3">
                        <h2 className="text-xl">{product.name}</h2>
                        <p className="text-gray-500 mr-4">
                          {product.description}
                        </p>
                        <p className="text-lg font-semibold mt-2">
                          R${product.price}
                        </p>
                      </div>
                      <div className=" flex items-center min-w-max ">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg mr-3"
                        />
                      </div>
                    </div>
                    <hr className="w-full h-2/3" />
                  </React.Fragment>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MenuPage;
