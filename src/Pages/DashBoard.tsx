import { useState } from "react";
import DashboardCategories from "./CategoryAdmin/DashboardCategories";
import DashboardProduct from "./ProductAdmin/DashboardProduct";
import DashboardToppings from "./ToppingAdmin/DashboardTopping";
import DashboardOrders from "./OrderAdmin/DashboardOrders";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("products");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="flex justify-around text-xl gap-x-2 sticky top-28 bg-white">
        <p
          className={`${
            activeTab === "products"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("products")}
        >
          Products
        </p>
        <p
          className={`${
            activeTab === "toppings"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("toppings")}
        >
          Toppings
        </p>

        <p
          className={`${
            activeTab === "categories"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("categories")}
        >
          Categories
        </p>
        <p
          className={`${
            activeTab === "orders"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("orders")}
        >
          Orders
        </p>
      </div>
      <div>
        {activeTab === "products" && <DashboardProduct />}
        {activeTab === "categories" && <DashboardCategories />}
        {activeTab === "toppings" && <DashboardToppings />}
        {activeTab === "orders" && <DashboardOrders />}
      </div>
    </>
  );
};

export default DashBoard;
