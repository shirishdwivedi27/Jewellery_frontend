// // import { Routes, Route } from "react-router-dom";
// // import Navbar from "./components/Navbar";
// // import Home from "./pages/Home";
// // import Login from "./auth/Login";
// // import Register from "./auth/Register";
// // import ProductDetail from "./pages/ProductDetail";
// // import Cart from "./pages/Cart";
// // import FilteredProducts from "./pages/FilteredProducts";
// // import Hero from "./components/Hero";
// // import FeatureBanner from "./components/FeatureBanner";
// // import IntroBanner from "./components/IntroBanner";
// // import Footer from "./components/Footer";
// // import Chatbot from "./components/Chatbot";

// // export default function App() {
// //   return (
// //     <>
// //       <Navbar />
// //       {/* <Chatbot/>
// //       <Hero/>
// //       <FeatureBanner/>
// //       <IntroBanner/> */}
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/register" element={<Register />} />
// //         <Route path="/products/:id" element={<ProductDetail />} />
// //         <Route path="/cart" element={<Cart />} />
// //         <Route path="/products-dashboard" element={<FilteredProducts />} />
// //       </Routes>
// //       <Footer/>      
// //     </>
// //   );
// // }


// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./auth/Login";
// import Register from "./auth/Register";
// import ProductDetail from "./pages/ProductDetail";
// import Cart from "./pages/Cart";
// import FilteredProducts from "./pages/FilteredProducts";
// import ProductList from "./pages/ProductList";
// import Articles from "./pages/Articles";
// import CategoryPage from "./pages/CategoryPage";
// import SizingChart from "./pages/SizingChart";
// import Contact from "./pages/Contact";
// import Policies from "./pages/Policies";
// import FloatingContact from "./components/FloatingContact";
// import Footer from "./components/Footer";
// import AdminDashboard from "./auth/Admin";



// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/products" element={<ProductList />} />
//         <Route path="/products/:id" element={<ProductDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/products-dashboard" element={<FilteredProducts />} />
        
//         {/* Footer Links - Articles */}
//         <Route path="/articles" element={<Articles />} />
        
//         {/* Footer Links - Categories */}
//         <Route path="/category/:category" element={<CategoryPage />} />
        
//         {/* Footer Links - Info Pages */}
//         <Route path="/sizing-chart" element={<SizingChart />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/policy/:type" element={<Policies />} />
//         <Route path="/admin" element={<AdminDashboard/>} />


//       </Routes>
//       <FloatingContact />
//       <Footer/>
//     </>
//   );
// }
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import FilteredProducts from "./pages/FilteredProducts";
import Articles from "./pages/Articles";
import CategoryPage from "./pages/CategoryPage";
import SizingChart from "./pages/SizingChart";
import Contact from "./pages/Contact";
import Policies from "./pages/Policies";

import Login from "./auth/Login";
import Register from "./auth/Register";
import AdminDashboard from "./auth/Admin";

import ProtectedRoute from "./auth/ProtectedRoute";
import AdminRoute from "./auth/AdminRoute";

import FloatingContact from "./components/FloatingContact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="page-offset">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/sizing-chart" element={<SizingChart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy/:type" element={<Policies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES (LOGIN REQUIRED) */}
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products-dashboard"
          element={
            <ProtectedRoute>
              <FilteredProducts />
            </ProtectedRoute>
          }
        />

        {/*ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
      </div>
      <FloatingContact />
      <Footer />
    </>
  );
}
