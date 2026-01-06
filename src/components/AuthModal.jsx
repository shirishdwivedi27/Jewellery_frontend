import { useState } from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import "../styles/AuthModal.css";

export default function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()} // ⛔ stop overlay click
      >
        {/* CLOSE BUTTON */}
        <button className="auth-close" onClick={onClose}>×</button>

        {isLogin ? (
          <Login
            onRegisterClick={() => setIsLogin(false)}
            onLoginSuccess={onClose}
          />
        ) : (
          <Register
            onLoginClick={() => setIsLogin(true)}
            onRegisterSuccess={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
}
