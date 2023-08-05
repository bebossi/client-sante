import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
import LoginModal from "./Components/modals/LoginModal";
import { AuthContextComponent } from "./auth/authContext";
import MenuPage from "./Pages/MenuPage";
import AddToCartModal from "./Components/modals/AddToCartModal";

function App() {
  return (
    <>
      <AuthContextComponent>
        <div>
          <LoginModal />
          <AddToCartModal />
          <NavBar />
          <div className="pb-20 pt-28">
            <Routes>
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </div>
        </div>
      </AuthContextComponent>
    </>
  );
}

export default App;
