import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { Category } from "../interfaces";
import CategoryForm from "../Components/CategoryForm";

const CategoryPage = () => {
  const params = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [categoryFetched, setCategoryFetched] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/getCategory/${params.categoryId}`);
        setCategory(response.data);
        setCategoryFetched(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, [params.categoryId]);

  return <>{categoryFetched && <CategoryForm initialData={category} />} </>;
};

export default CategoryPage;
