import { useEffect, useRef, useState } from "react";
import { api } from "../api";
import useAddToCartModal from "../hooks/useAddToCartModal";
import { Product, Category } from "../interfaces";
import useCartModal from "../hooks/useCartModal";
import ProductCard from "../Components/ProductCard";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from "react-slick";

const AA = () => {

    const addCartModal = useAddToCartModal();
    const cartModal = useCartModal()
    const [products, setProducts] = useState<Product[]>();
    const [categories, setCategories] = useState<Category[]>();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedCategorySide, setSelectedCategorySide] = useState<
      string | null
    >(null);
  
    const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  
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
  
    // const handleCategoryClick = (categoryId: string,) => {
    //   const categoryElement = document.getElementById(
    //     `categorySide-${categoryId}`
    //   );
    //   if (categoryElement) {
    //     setSelectedCategorySide(categoryId);
        
    //     const headerOffset = 100;
    //     const elementPosition = categoryElement.offsetLeft;
    //     const offsetPosition = elementPosition - headerOffset;
        
    //     console.log("elemetn position:" ,  elementPosition)
    //     console.log("offset position:" , offsetPosition)
    //     if (scrollableContainerRef.current) {
    //       scrollableContainerRef.current.scrollLeft = offsetPosition;
    //     }
    //   }
    
    //   goToProductsOfCategoryId(categoryId);
    // };
    const handleCategoryClick = (categoryId: string) => {
      const categoryElement = document.getElementById(`categorySide-${categoryId}`);
      
      if (categoryElement) {
        setSelectedCategorySide(categoryId);
    
        const headerOffset = window.innerWidth / 2; // Adjust as needed
        const elementPosition = categoryElement.offsetLeft + categoryElement.offsetWidth / 2;
        const offsetPosition = elementPosition - headerOffset;
    
        console.log("element position:", elementPosition);
        console.log("offset position:", offsetPosition);
    
        if (scrollableContainerRef.current) {
          const scrollContainerWidth = scrollableContainerRef.current.offsetWidth;
          const maxScroll = scrollableContainerRef.current.scrollWidth - scrollContainerWidth;
          const finalScroll = Math.max(Math.min(offsetPosition, maxScroll), 0);
    
          scrollableContainerRef.current.scrollLeft = finalScroll;
        }
      }
    
      goToProductsOfCategoryId(categoryId);
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
      };
  
  return (
    <div>
    <div className="flex flex-col items-center ">
      <div
        ref={scrollableContainerRef}
        className="  sticky w-full border-b-2 bg-white top-28 overflow-x-hidden h-24 "
      >
          <Slider {...settings}>
        {categories?.map((category) => (
            <div  onClick={() => handleCategoryClick(category.id)} key={category.id} className="shrink-0 py-3 px-1 cursor-pointer">
                <p>{category.name}</p>
          </div>
        ))}
        </Slider>
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
  )
}

export default AA
