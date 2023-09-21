import { useLocation, useNavigate } from "react-router-dom";

const DashboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <ul className="flex justify-around text-xl gap-x-2 sticky top-30 bg-white lg:text-4xl md:text-3xl sm:text-2xl">
        <li
          className={`${
            location.pathname.includes("dashboardOverview")
              ? "shadow-md bg-red-900 p-2 rounded-lg text-white"
              : ""
          }  `}
          onClick={() => navigate("/dashboardOverview")}
        >
          Dashboard
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardOrders")
              ? "shadow-md bg-red-900 p-2 rounded-lg text-white"
              : ""
          }  `}
          onClick={() => navigate("/dashboardOrders")}
        >
          Pedidos
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardProduct")
              ? "shadow-md bg-red-900 p-2 rounded-lg text-white"
              : ""
          } `}
          onClick={() => navigate("/dashboardProduct")}
        >
          Produtos
        </li>
        <li
          className={`${
            location.pathname.includes("dashboardToppings")
              ? "shadow-md bg-red-900 p-2 rounded-lg text-white"
              : ""
          } `}
          onClick={() => navigate("/dashboardToppings")}
        >
          Toppings
        </li>

        <li
          className={`${
            location.pathname.includes("dashboardCategories")
              ? "shadow-md bg-red-900 p-2 rounded-lg text-white"
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
