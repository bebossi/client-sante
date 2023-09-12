import { useContext, useState } from "react";
import DashboardCategories from "./CategoryAdmin/DashboardCategories";
import DashboardProduct from "./ProductAdmin/DashboardProduct";
import DashboardToppings from "./ToppingAdmin/DashboardTopping";
import DashboardOrders from "./OrderAdmin/DashboardOrders";
import { UserContext } from "../auth/currentUser";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const {user} = useContext(UserContext)

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  
  if( (user && user.role !== "admin") || !user ) {
    return (
      <div>Você não tem acesso a essa página</div>
    )
  }

  return (
    <>
      <ul className="flex justify-around text-xl gap-x-2 sticky top-30 bg-white lg:text-4xl md:text-3xl sm:text-2xl">
        <li
          className={`${
            activeTab === "orders"
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200  rounded-md"
              : ""
          }  `}
          onClick={() => handleTabClick("orders")}
        >
          Pedidos
        </li>
        <li
          className={`${
            activeTab === "products"
            ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
            : ""
          } `}
          onClick={() => handleTabClick("products")}
        >
          Produtos
        </li>
        <li
          className={`${
            activeTab === "toppings"
            ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
            : ""
          } `}
          onClick={() => handleTabClick("toppings")}
        >
          Toppings
        </li>

        <li
          className={`${
            activeTab === "categories"
            ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
            : ""
          } `}
          onClick={() => handleTabClick("categories")}
        >
          Categorias
        </li>
      </ul>
      <div className="mt-2">
        {activeTab === "orders" && <DashboardOrders />}
        {activeTab === "products" && <DashboardProduct />}
        {activeTab === "categories" && <DashboardCategories />}
        {activeTab === "toppings" && <DashboardToppings />}
      </div>
    </>
  );
};

export default DashBoard;
