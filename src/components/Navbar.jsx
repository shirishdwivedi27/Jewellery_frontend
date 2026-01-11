import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/Navbar.css";
// import AdminRoute from "../auth/AdminRoute";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount] = useState(0);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo">
          <img 
            src="logohridika.png" 
            alt="Jewels Logo"
            className="logo-image"
          />
        </div>

        <ul className="navbar-menu">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/products" className="nav-link">All Products</a></li>
          <li className="dropdown">
            <a href="#women" className="nav-link">Women</a>
          </li>
          <li className="dropdown">
            <a href="#men" className="nav-link">Men</a>
          </li>
          <li><a href="/articles" className="nav-link">Articles</a></li>
          <li><a href="/bespoke" className="nav-link">Bespoke Customisation</a></li>
          <li><a href="/about" className="nav-link">About</a></li>
         {/* <AdminRoute> <li className="admin-btn-wrapper"><a href="/admin" className=""> Admin </a></li> </AdminRoute> */}
        </ul>

        <div className="navbar-icons">
          <div className="account-menu">
            <button 
              className="icon-btn" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              title="Account"
            >
              👤
            </button>

            {isDropdownOpen && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <p className="dropdown-email">{user.email}</p>
                    <a onClick={() => navigate("/profile")}>My Profile</a>
                    <a onClick={() => navigate("/orders")}>My Orders</a>
                    <button onClick={handleLogout} className="logout-btn">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="cart-icon">
            <button 
              className="icon-btn" 
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              🛍️
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

