import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import LoginModal from "./Components/modals/LoginModal";
import { AuthContextComponent } from "./auth/authContext";
import MenuPage from "./Pages/MenuPage";
import AddToCartModal from "./Components/modals/AddToCartModal";
import CartModal from "./Components/modals/CartModal";
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
import { RestaurantContextProvider } from "./auth/restaurantContext";
import { ProtectedRoute } from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextComponent>
        <UserContextProvider>
          <RestaurantContextProvider>
            <div>
              <ToasterProvider />
              <AddToCartModal />
              <LoginModal />
              <RegisterModal />
              <CartModal />
              <NavBar />
              <div className="pb-0 pt-28">
                <Routes>
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/dashboardOverview"
                    element={<ProtectedRoute component={DashBoard} />}
                  />
                  <Route
                    path="/dashboardProduct"
                    element={<ProtectedRoute component={DashboardProduct} />}
                  />
                  <Route
                    path="/dashboardCategories"
                    element={<ProtectedRoute component={DashboardCategories} />}
                  />

                  <Route
                    path="/dashboardToppings"
                    element={<ProtectedRoute component={DashboardToppings} />}
                  />
                  <Route
                    path="/dashboardOrders"
                    element={<ProtectedRoute component={DashboardOrders} />}
                  />
                  <Route
                    path="/product/:productId"
                    element={<ProtectedRoute component={ProductPage} />}
                  />
                  <Route
                    path="/product"
                    element={<ProtectedRoute component={ProductPage} />}
                  />
                  <Route
                    path="/topping/:toppingId"
                    element={<ProtectedRoute component={ToppingPage} />}
                  />
                  <Route
                    path="/topping"
                    element={<ProtectedRoute component={ToppingPage} />}
                  />
                  <Route
                    path="/category/:categoryId"
                    element={<ProtectedRoute component={CategoryPage} />}
                  />
                  <Route
                    path="/category"
                    element={<ProtectedRoute component={CategoryPage} />}
                  />
                  <Route
                    path="/order/:orderId"
                    element={<ProtectedRoute component={OrderPage} />}
                  />
                  <Route
                    path="/appointment"
                    element={<ProtectedRoute component={AppointmentsPage} />}
                  />
                  <Route path="orders" element={<OrdersClientPage />} />
                </Routes>
              </div>
            </div>
          </RestaurantContextProvider>
        </UserContextProvider>
      </AuthContextComponent>
    </>
  );
}

export default App;
