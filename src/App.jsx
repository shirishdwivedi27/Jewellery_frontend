import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import FilteredProducts from "./pages/FilteredProducts";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products-dashboard" element={<FilteredProducts />} />
      </Routes>
    </>
  );
}
