import HomeView from "./views/HomeView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import ShopFooter from "./components/Footer/ShopFooter";
import ErrorView from "./views/ErrorView";
import CartView from "./views/CartView";
import DeliveryView from "./views/DeliveryView";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useGlobalContext } from "./components/GlobalContext/GlobalContext";
import { ToastContainer } from "react-toastify";
import Modal from "./components/Modals/Modal";
import CancelOrder from "./components/Modals/CancelOrder";
import "react-toastify/dist/ReactToastify.css";
import ProductDetailsView from "./views/ProductDetailsView";
import ProductsView from "./views/ProductsView";

function App() {
  let { store } = useGlobalContext();
  let { modal } = useGlobalContext();
  useEffect(() => {
    if (store.state.products.length > 0) return;
    store.getProducts();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar></NavBar>
        </header>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/delivery" element={<DeliveryView />} />
          <Route path="/products/:id" element={<ProductDetailsView />} />
          <Route path="/products/view-all" element={<ProductsView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
        <footer>
          <ShopFooter></ShopFooter>
        </footer>
      </BrowserRouter>
      {modal.opened && (
        <Modal
          header={modal.isRegister ? "Create Account" : "Login"}
          submitAction="/"
          buttonText={modal.isRegister ? "Create Account" : "Login"}
          isRegister={modal.isRegister}
        />
      )}
      {modal.isCancelModal && <CancelOrder></CancelOrder>}
      <ToastContainer />
    </div>
  );
}

export default App;