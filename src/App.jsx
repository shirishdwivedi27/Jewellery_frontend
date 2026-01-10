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
import FloatingContact from "./components/FloatingContact";
import AdminDashboard from "./auth/Admin";
import ForgotPassword from "./auth/Forgetpassword";
import ResetPassword from "./auth/Resetpassword";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./pages/Profile";
import BespokeCustomization from "./pages/BespokeCustomization";
import About from "./pages/About";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Whatsapp from "./components/Whatsapp";

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
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        {/* Footer Links - Articles */}
        <Route path="/articles" element={<Articles />} />
        <Route path="/profile"
          element={
              <ProtectedRoute>
                  <Profile />
              </ProtectedRoute>
            }
       />

          <Route path="/bespoke" element={<BespokeCustomization />} />
          <Route path="/about" element={<About />} />
          <Route path="/orders/:id" element={<OrderDetails />} />

       <Route
           path="/orders"
           element={
           
               <Orders/>
           
           }
          />
        {/* Footer Links - Categories */}
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        {/* Footer Links - Info Pages */}
        <Route path="/sizing-chart" element={<SizingChart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy/:type" element={<Policies />} />
      </Routes>
      <Whatsapp/>
      <FloatingContact />
    </>
  );
}
