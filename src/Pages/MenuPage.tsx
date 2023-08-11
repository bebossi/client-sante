import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import { Product, Category } from "../interfaces";
import useCartModal from "../hooks/useCartModal";
import ProductCard from "../Components/ProductCard";
import { AuthContext } from "../auth/authContext";


const MenuPage = () => {
  const addCartModal = useAddToCartModal();
  const cartModal = useCartModal()
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategorySide, setSelectedCategorySide] = useState<
    string | null
  >(null);

  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const {user, setUser, setLoggedInToken} = useContext(AuthContext)

  const fetchGuestUser = async () => {
    try{
      const response = await api.post("/guestUser")
      const token = response.data.token
      setUser(response.data.guestUser)
      setLoggedInToken(token)
      localStorage.setItem("token", token)

    } catch(err){
      console.log(err);
    }
  }

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
     
    if(!user){
      fetchGuestUser()
    }
    
    fetchProducts();
    fetchCategories();
  }, []);

  const handleProductClick = (product: Product) => {
    addCartModal.onOpen(product);
  };

  const goToProductsOfCategoryId = (categoryId: string) => {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    if (categoryElement) {
      setSelectedCategory(categoryId); // Update the selected category ID
      const headerOffset = 162;
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryId: string,) => {
    const categoryElement = document.getElementById(
      `categorySide-${categoryId}`
    );
    if (categoryElement) {
      setSelectedCategorySide(categoryId);
      
      const headerOffset = 130;
      const elementPosition = categoryElement.offsetLeft;
      const offsetPosition = elementPosition - headerOffset;
      
     
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollLeft = offsetPosition;
      }
    }
  
    goToProductsOfCategoryId(categoryId);
  };

  return (
    <div>
      <div className="flex flex-col items-center ">
        <div
          ref={scrollableContainerRef}
          className="flex items-center gap-x-14 sticky w-full border-b-2 bg-white top-28 overflow-x-hidden "
        >
          {categories?.map((category) => (
              <div key={category.id} className="shrink-0 py-3 px-1 cursor-pointer">
              <p
                id={`categorySide-${category.id}`}
                onClick={() => handleCategoryClick(category.id)}
                className={`text-lg font-semibold 
                  ${selectedCategory && selectedCategorySide === category.id
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : ""}`
                }
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
            <h2 onClick={cartModal.onOpen} className="text-2xl font-semibold py-2 flex  items-center justify-start ml-6">
              {category.name}
            </h2>
            <div className="grid  sm:grid-cols-1 lg:grid-cols-2">
              {products
                ?.filter((product) => product.categoryId === category.id)
                .map((product) => (
                  <ProductCard key={product.id} onClick={() => handleProductClick(product)} title={product.name} description={product.description} image={product.image} price={product.price} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
