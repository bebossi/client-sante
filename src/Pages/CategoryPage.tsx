import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { Category } from "../interfaces";
import CategoryForm from "../Components/Forms/CategoryForm";

const CategoryPage = () => {
  const params = useParams();

  const [category, setCategory] = useState<Category | null>(null);
  const [fetchingCategory, setfetchingCategory] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/getCategory/${params.categoryId}`);
        setCategory(response.data);
        setfetchingCategory(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (params.categoryId) {
      fetchCategory();
    } else {
      setfetchingCategory(false);
    }
  }, [params.categoryId]);

  return (
    <>
      {fetchingCategory ? (
        <p>Loading ...</p>
      ) : (
        <CategoryForm initialData={category} />
      )}
    </>
  );
};

export default CategoryPage;
