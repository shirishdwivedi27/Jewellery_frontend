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
//import Whatsapp from "./pages/Temp";
import ProtectedRoute from "./auth/ProtectedRoute";
import Profile from "./pages/Profile";
import BespokeCustomization from "./pages/BespokeCustomization";
import About from "./pages/About";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Whatsapp from "./components/Whatsapp";
import AdminRoute from "./auth/AdminRoute";
import { useEffect, useState } from "react";
import { useAuth } from "./auth/AuthContext";
import LoginPrompt from "./components/LoginPrompt";
import AdminButton from "./components/AdminButton";


export default function App() {
  const { user } = useAuth();
  // const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
useEffect(() => {
  if (user) return;

  const timer = setTimeout(() => {
    setShowLoginPrompt(true);
  }, 9000);

  return () => clearTimeout(timer);
}, [user]);
  // useEffect(() => {
  //   if (user) return;

  //   const alreadyShown = localStorage.getItem("login_prompt_shown");
  //   if (alreadyShown) return;

  //   const timer = setTimeout(() => {
  //     setShowLoginPrompt(true);
  //     localStorage.setItem("login_prompt_shown", "true");
  //   }, 900); // 9 seconds

  //   return () => clearTimeout(timer);
  // }, [user]);

  return (
    <>
      <Navbar />
      {showLoginPrompt && (
        <LoginPrompt onClose={() => setShowLoginPrompt(false)} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProtectedRoute> <ProductDetail /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={ <ProtectedRoute> <Cart /> </ProtectedRoute> } />
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
          <Route path="/api/orders/:id" element={<OrderDetails />} />

       <Route
           path="/orders"
           element={
           <ProtectedRoute> <Orders/> </ProtectedRoute>
           }
          />
        {/* Footer Links - Categories */}
        <Route path="/category/:category" element={<CategoryPage />} />

        <Route path="/admin" element={ <AdminRoute> <AdminDashboard/> </AdminRoute>  } />
        
        {/* Footer Links - Info Pages */}
        <Route path="/sizing-chart" element={<SizingChart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy/:type" element={<Policies />} />
      </Routes>
      <FloatingContact />
      <Whatsapp/> 
      {/* <AdminRoute> <AdminButton/> </AdminRoute> */}
       <AdminButton/>
    </>
  );
}
