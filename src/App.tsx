import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import LoginModal from "./Components/modals/LoginModal";
import { AuthContextComponent } from "./auth/authContext";
import MenuPage from "./Pages/MenuPage";
import AddToCartModal from "./Components/modals/AddToCartModal";
import CartModal from "./Components/modals/CartModal";
import "./App.css";
import ProductPage from "./Pages/ProductPage";
import DashboardCategories from "./Pages/CategoryAdmin/DashboardCategories";
import DashboardToppings from "./Pages/ToppingAdmin/DashboardTopping";
import ToppingPage from "./Pages/ToppingPage";
import DashboardProduct from "./Pages/ProductAdmin/DashboardProduct";
import DashBoard from "./Pages/DashBoard";
import CategoryPage from "./Pages/CategoryPage";
import ToasterProvider from "./Providers/ToaterProvider";
import Home from "./Pages/Home";
import DashboardOrders from "./Pages/OrderAdmin/DashboardOrders";
import OrderPage from "./Pages/OrderPage";
import { UserContextProvider } from "./auth/currentUser";
import AppointmentsPage from "./Pages/AppointmentsPage";
import RegisterModal from "./Components/modals/RegisterModal";
import OrdersClientPage from "./Pages/OrdersClientPage";

function App() {
  return (
    <>
      <AuthContextComponent>
        <UserContextProvider>
          <div>
            <ToasterProvider />
            <AddToCartModal />
            <LoginModal />
            <RegisterModal/>
            <CartModal />
            <NavBar />
            <div className="pb-0 pt-28">
              <Routes>
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route
                  path="/dashboardProduct"
                  element={<DashboardProduct />}
                />
                <Route
                  path="/dashboardCategories"
                  element={<DashboardCategories />}
                />
                <Route
                  path="/dashboardToppings"
                  element={<DashboardToppings />}
                />
                <Route path="/dashboardOrders" element={<DashboardOrders />} />
                <Route path="/product/:productId" element={<ProductPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/topping/:toppingId" element={<ToppingPage />} />
                <Route path="/topping" element={<ToppingPage />} />
                <Route
                  path="/category/:categoryId"
                  element={<CategoryPage />}
                />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/order/:orderId" element={<OrderPage />} />
                <Route path="/appointment" element={<AppointmentsPage />} />
                <Route path="orders" element={<OrdersClientPage/>} />
              </Routes>
            </div>
          </div>
        </UserContextProvider>
      </AuthContextComponent>
    </>
  );
}

export default App;
