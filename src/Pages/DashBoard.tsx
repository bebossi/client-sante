import { useState } from "react";
import DashboardCategories from "./CategoryAdmin/DashboardCategories";
import DashboardProduct from "./ProductAdmin/DashboardProduct";
import DashboardToppings from "./ToppingAdmin/DashboardTopping";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-around text-4xl gap-x-2 sticky">
        <p className={`${activeTab === "products" ? "border-b-2 border-red-600 text-red-600" : ""}`} onClick={() => handleTabClick("products")}>Products</p>
        <p className={`${activeTab === "toppings" ? "border-b-2 border-red-600 text-red-600" : ""}`} onClick={() => handleTabClick("toppings")}>Toppings</p>
        <p className={`${activeTab === "categories" ? "border-b-2 border-red-600 text-red-600" : ""}`} onClick={() => handleTabClick("categories")}>Categories</p>
      </div>
      <div>
        {activeTab === "products" && <DashboardProduct />}
        {activeTab === "categories" && <DashboardCategories />}
        {activeTab === "toppings" && <DashboardToppings />}
      </div>
    </>
  );
};

export default DashBoard;
