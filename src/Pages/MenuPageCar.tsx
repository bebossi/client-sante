import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import { Product, Category } from "../interfaces";
import useCartModal from "../hooks/useCartModal"; 
import ProductCard from "../Components/ProductCard";
import { AuthContext } from "../auth/authContext";

const MenuPageCar = () => {
  const addCartModal = useAddToCartModal();
  const cartModal = useCartModal();
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategorySide, setSelectedCategorySide] = useState<
    string | null
  >(null);

  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser, setLoggedInToken } = useContext(AuthContext);
  console.log(cartModal.cartItems)
  

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

    const fetchGuestUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          const response = await api.post("/guestUser");
          const token = response.data.token;
          setUser(response.data.guestUser);
          setLoggedInToken(token);
          localStorage.setItem("token", token);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (!user) {
      fetchGuestUser();
    }

    fetchProducts();
    fetchCategories();
  }, [user]);

  const handleProductClick = (product: Product) => {
    addCartModal.onOpen(product);
  };



  return (
    <div>
      <div className="flex flex-col items-center ">
        <div
          ref={scrollableContainerRef}
          className="flex items-center gap-x-12 sticky w-full border-b-2 bg-white top-28 overflow-x-hidden "
        >
          {categories?.map((category) => (
            <div
              key={category.id}
              className="shrink-0 py-3 px-1 cursor-pointer"
            >
              <p
                id={`categorySide-${category.id}`}
                className={`text-lg font-semibold 
                  ${
                    selectedCategory && selectedCategorySide === category.id
                      ? "border-b-2 border-red-600 text-red-600"
                      : ""
                  }`}
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
            <h2
              
              className="text-xl font-bold py-1 flex items-center justify-start ml-4"
            >
              {category.name}
            </h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {products
                ?.filter((product) => product.categoryId === category.id)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    title={product.name}
                    description={product.description}
                    image={product.image}
                    price={product.price}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      {cartModal.cartItems.length > 0 && (
        <div onClick={cartModal.onOpen} className="sticky bg-red-600 bottom-0 flex justify-center py-1 hover:cursor-pointer">
          <p className="font-semibold text-lg text-white">Ver carrinho</p>
        </div>
      )}
    </div>
  );
};

export default MenuPageCar;
