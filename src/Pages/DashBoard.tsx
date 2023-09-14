import { useContext, useState } from "react";
// import DashboardCategories from "./CategoryAdmin/DashboardCategories";
// import DashboardProduct from "./ProductAdmin/DashboardProduct";
// import DashboardToppings from "./ToppingAdmin/DashboardTopping";
// import DashboardOrders from "./OrderAdmin/DashboardOrders";
import { UserContext } from "../auth/currentUser";
import { useNavigate } from "react-router-dom";
import DashboardNavigation from "../Components/DashboardNavigation";

const DashBoard = () => {
  const {user} = useContext(UserContext)

  if( (user && user.role !== "admin") || !user ) {
    return (
      <div>Você não tem acesso a essa página</div>
    )
  }

  return (
    <>
     <DashboardNavigation/>
      <div className="mt-2">
    
      </div>
    </>
  );
};

export default DashBoard;
