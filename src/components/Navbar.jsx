
// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import "../styles/Navbar.css";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [cartCount] = useState(0);
//   const [scrolled, setScrolled] = useState(false);

//   /* Scroll background effect */
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     setIsDropdownOpen(false);
//   };

//   return (
//     <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
//       <div className="navbar-container">

//         {/* Logo */}
//         <div className="navbar-logo" onClick={() => navigate("/")}>
//           <img
//             // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOi0UJsHKRUY3HMcFmhxZRb66idJte1TeCQ&s"
//             src="logo1.jpg"
//             alt="Kanika Jewels"
//             className="logo-image"
//           />
//         </div>

//         {/* Nav Menu */}
//         <ul className="navbar-menu">
//           <li>
//             <NavLink to="/" end className="nav-link">
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/products-dashboard" className="nav-link">
//               All Products
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/women" className="nav-link">
//               Women
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/men" className="nav-link">
//               Men
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/articles" className="nav-link">
//               Articles
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/bespoke" className="nav-link">
//               Bespoke
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/about" className="nav-link">
//               About
//             </NavLink>
//           </li>
//         </ul>

//         {/* Right Icons */}
//         <div className="navbar-icons">

//           {/* Account */}
//           <div className="account-menu">
//             <button
//               className="icon-btn"
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//             >
//               👤
//             </button>

//             {isDropdownOpen && (
//               <div className="dropdown-menu">
//                 {user ? (
//                   <>
//                     <p className="dropdown-email">{user.email}</p>
//                     <NavLink to="/profile">My Profile</NavLink>
//                     <NavLink to="/orders">My Orders</NavLink>
//                     <button className="logout-btn" onClick={handleLogout}>
//                       Logout
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <NavLink to="/login">Login</NavLink>
//                     <NavLink to="/register">Register</NavLink>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Cart */}
//           <div className="cart-icon">
//             <button
//               className="icon-btn"
//               onClick={() => navigate("/cart")}
//             >
//               <img
//             src="data:image/png;base64,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"
//             alt="Kanika Jewels"
//             className="logo-image"
//           />
//               {cartCount > 0 && (
//                 <span className="cart-badge">{cartCount}</span>
//               )}
//             </button>
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// }
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import AuthModal from "./AuthModal";
import "../styles/Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [cartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  /* Scroll background effect */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">

          {/* Logo */}
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <img
              src="logo4.png"
              alt="HRIDIKA JEWELS"
              className="logo-image"
            />
          </div>

          {/* Nav Menu */}
          <ul className="navbar-menu">
            <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
            <li><NavLink to="/products-dashboard" className="nav-link">All Products</NavLink></li>
            <li><NavLink to="/women" className="nav-link">Women</NavLink></li>
            <li><NavLink to="/men" className="nav-link">Men</NavLink></li>
            <li><NavLink to="/articles" className="nav-link">Articles</NavLink></li>
            <li><NavLink to="/bespoke" className="nav-link">Bespoke</NavLink></li>
            <li><NavLink to="/about" className="nav-link">About</NavLink></li>
          </ul>

          {/* Right Icons */}
          <div className="navbar-icons">

            {/* ACCOUNT */}
            {!user ? (
              <button
                className="icon-btn"
                onClick={() => setShowAuthModal(true)}
                title="Login / Register"
              >
                👤
              </button>
            ) : (
              <button
                className="icon-btn"
                onClick={handleLogout}
                title="Logout"
              >
                My Profile
              </button>
            )}

            {/* CART */}
            <button
              className="icon-btn"
              onClick={() => navigate("/cart")}
            >
              🛍️
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* AUTH MODAL */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
