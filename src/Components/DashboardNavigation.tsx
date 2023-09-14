import { useLocation, useNavigate } from "react-router-dom";

const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
     
      <ul className="flex justify-around text-xl gap-x-2 sticky top-30 bg-white lg:text-4xl md:text-3xl sm:text-2xl">
      <li
          className={`${
            location.pathname.includes("dashboard")
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200  rounded-md"
              : ""
          }  `}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardOrders")
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200  rounded-md"
              : ""
          }  `}
          onClick={() => navigate("/dashboardOrders")}
        >
          Pedidos
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardProduct")
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
              : ""
          } `}
          onClick={() => navigate("/dashboardProduct")}
        >
          Produtos
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardToppings")
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
              : ""
          } `}
          onClick={() => navigate("/dashboardToppings")}
        >
          Toppings
        </li>

        <li
          className={`${
            location.pathname.includes("dashboardCategories")
              ? " border-b-2 border-red-600 text-red-600 shadow-md bg-gray-200 p-2 rounded-md"
              : ""
          } `}
          onClick={() => navigate("/dashboardCategories")}
        >
          Categorias
        </li>
      </ul>
    </div>
  );
};

export default DashboardNavigation;
