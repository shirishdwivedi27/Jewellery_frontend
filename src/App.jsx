import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import FilteredProducts from "./pages/FilteredProducts";
import ProductList from "./pages/ProductList";
import Articles from "./pages/Articles";
import CategoryPage from "./pages/CategoryPage";
import SizingChart from "./pages/SizingChart";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products-dashboard" element={<FilteredProducts />} />
        
        {/* Footer Links - Articles */}
        <Route path="/articles" element={<Articles />} />
        
        {/* Footer Links - Categories */}
        <Route path="/category/:category" element={<CategoryPage />} />
        
        {/* Footer Links - Info Pages */}
        <Route path="/sizing-chart" element={<SizingChart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy/:type" element={<Policies />} />
      </Routes>
    </>
  );
}
