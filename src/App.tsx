import { Route, Routes } from 'react-router-dom';
import NavBar from './Components/Navbar/NavBar';
import {
  LoginModal,
  AddToCartModal,
  CartModal,
  RegisterModal,
} from './Components/modals';
import MenuPage from './Pages/MenuPage';
import ProductPage from './Pages/ProductPage';
import DashboardCategories from './Pages/DashboardCategories';
import DashboardToppings from './Pages/DashboardTopping';
import ToppingPage from './Pages/ToppingPage';
import DashboardProduct from './Pages/DashboardProduct';
import CategoryPage from './Pages/CategoryPage';
import ToasterProvider from './Providers/ToaterProvider';
import Home from './Pages/Home';
import DashboardOrders from './Pages/DashboardOrders';
import OrderPage from './Pages/OrderPage';
import { UserContextProvider } from './Contexts/currentUser';
import AppointmentsPage from './Pages/AppointmentsPage';
import OrdersClientPage from './Pages/OrdersClientPage';
import { RestaurantContextProvider } from './Contexts/restaurantContext';
import { ProtectedRoute } from './Components/ProtectedRoute';
import CheckoutPage from './Pages/Payment';
import MercadoPagoProvider from './Contexts/mercadoPagoContext';
import Dashboard from './Pages/DashBoard';

function App() {
  return (
    <>
      <UserContextProvider>
        <RestaurantContextProvider>
          <MercadoPagoProvider>
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
                    element={<ProtectedRoute component={Dashboard} />}
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
                  <Route path="/order/:orderId" element={<OrderPage />} />
                  <Route
                    path="/appointment"
                    element={<ProtectedRoute component={AppointmentsPage} />}
                  />
                  <Route path="/orders" element={<OrdersClientPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
              </div>
            </div>
          </MercadoPagoProvider>
        </RestaurantContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
