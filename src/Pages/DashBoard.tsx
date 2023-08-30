import { useContext, useState } from "react";
import DashboardCategories from "./CategoryAdmin/DashboardCategories";
import DashboardProduct from "./ProductAdmin/DashboardProduct";
import DashboardToppings from "./ToppingAdmin/DashboardTopping";
import DashboardOrders from "./OrderAdmin/DashboardOrders";
import { UserContext } from "../auth/currentUser";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const {user} = useContext(UserContext)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if(user.role !== "admin") {
    return (
      <div>Você não tem acesso a essa página</div>
    )
  }

  return (
    <>
      <div className="flex justify-around text-xl gap-x-2 sticky top-28 bg-white lg:text-4xl md:text-3xl sm:text-2xl">
        <p
          className={`${
            activeTab === "products"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("products")}
        >
          Produtos
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
          Categorias
        </p>
        <p
          className={`${
            activeTab === "orders"
              ? "border-b-2 border-red-600 text-red-600"
              : ""
          }`}
          onClick={() => handleTabClick("orders")}
        >
          Pedidos
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
