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
import DashboardAdmin from "./Pages/DashboardAdmin";
import ProductPage from "./Pages/ProductPage";


function App() {
  return (
    <>
      <AuthContextComponent>
        <div>
          <AddToCartModal />
          <LoginModal />
          <CartModal/>
          <NavBar />
          <div className="pb-0 pt-28">
            <Routes>
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/dashboard" element={<DashboardAdmin/>}/>
              <Route path="/map" element={<Map/>} />
              <Route path="/b" element={<B/>} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/product" element={<ProductPage />} />
            </Routes>
          </div>
        </div>
      </AuthContextComponent>
    </>
  );
}

export default App;
