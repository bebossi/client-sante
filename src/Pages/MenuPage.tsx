import { useContext, useEffect, useRef, useState } from "react";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import { Product, Category } from "../interfaces";
import useCartModal from "../hooks/useCartModal";
import ProductCard from "../Components/ProductCard";
import { UserContext } from "../auth/currentUser";
import { ShoppingBag } from "lucide-react";

const MenuPage = () => {
  const addCartModal = useAddToCartModal();
  const cartModal = useCartModal();
  const [products, setProducts] = useState<Product[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategorySide, setSelectedCategorySide] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [productsResponse, categoriesResponse] = await Promise.all([
          api.get("/getProducts"),
          api.get("/getCategories"),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);

        if (!user) {
          const guestUserResponse = await api.post("/guestUser");
          setUser(guestUserResponse.data.guestUser);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [location.reload, cartModal.isOpen, addCartModal.isOpen, user]);

  const handleProductClick = (product: Product) => {
    addCartModal.onOpen(product);
  };

  const goToProductsOfCategoryId = (categoryId: string) => {
    const categoryElement = document.getElementById(`category-${categoryId}`);
    if (categoryElement) {
      setSelectedCategory(categoryId);
      const headerOffset = 162;
      const elementPosition = categoryElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (categoryId: string) => {
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

  if (isLoading) {
    return (
      <div className="animate-spin  flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

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
                onClick={() => handleCategoryClick(category.id)}
                className={`text-lg font-semibold lg:text-2xl sm:text-xl md:text-2xl
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
            <h2 className="text-xl font-bold p-4 flex items-center justify-start ml-4 lg:text-4xl sm:text-3xl">
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
        <div
          data-cy="cart-div"
          onClick={cartModal.onOpen}
          // className="sticky bottom-0 bg-white rounded-full "
          className={`sticky bg-red-600 bottom-0 flex justify-center items-center py-1 hover:cursor-pointer`}
        >
          <p className="font-semibold text-lg text-white px-2">Ver carrinho</p>
          <ShoppingBag />
        </div>
      )}
    </div>
  );
};

export default MenuPage;
