import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import LoginModal from "./Components/modals/LoginModal";
import { AuthContextComponent } from "./auth/authContext";
import MenuPage from "./Pages/MenuPage";
import AddToCartModal from "./Components/modals/AddToCartModal";
import CartModal from "./Components/modals/CartModal";
import Map from "./Components/Map";
import B from "./Pages/b";
import "./App.css"
import ProductPage from "./Pages/ProductPage";
import DashboardCategories from "./Pages/CategoryAdmin/DashboardCategories";
import DashboardToppings from "./Pages/ToppingAdmin/DashboardTopping";
import ToppingPage from "./Pages/ToppingPage";
import DashboardProduct from "./Pages/ProductAdmin/DashboardProduct";
import DashBoard from "./Pages/DashBoard";
import CategoryPage from "./Pages/CategoryPage";
import ToasterProvider from "./Providers/ToaterProvider";
import MenuPageCar from "./Pages/MenuPageCar";


function App() {
  return (
    <>
      <AuthContextComponent>
        <div>
          <ToasterProvider/>
          <AddToCartModal />
          <LoginModal />
          <CartModal/>
          <NavBar />
          <div className="pb-0 pt-28">
            <Routes>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menuu" element={<MenuPageCar />} />

              <Route path="/dashboard" element={<DashBoard/>}/>
              <Route path="/dashboardProduct" element={<DashboardProduct/>}/>
              <Route path="/dashboardCategories" element={<DashboardCategories/>}/>
              <Route path="/dashboardToppings" element={<DashboardToppings/>}/>
              <Route path="/map" element={<Map/>} />
              <Route path="/b" element={<B/>} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/topping/:toppingId" element={<ToppingPage/>}/>
              <Route path="/topping" element={<ToppingPage/>}/>
              <Route path="/category/:categoryId" element={<CategoryPage/>}/>
              <Route path="/category" element={<CategoryPage/>}/>
            </Routes>
          </div>
        </div>
      </AuthContextComponent>
    </>
  );
}

export default App;
