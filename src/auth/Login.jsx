import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/Auth.css";

export default function Login({ isModal = false, onSuccess }) {
  const [mode, setMode] = useState("phone"); // 🔥 phone | email
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userData = await login(email, password);

      if (onSuccess) {
        onSuccess();
        return;
      }

      navigate(userData.role === "admin" ? "/admin" : "/products-dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    // 🔥 Later this will call OTP API
    alert("OTP will be sent to +91 " + phone);
  };

  return (
    <div className={isModal ? "" : "auth-container"}>
      <div className="auth-card modal">
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">
          {mode === "phone"
            ? "Login using your mobile number"
            : "Login using email & password"}
        </p>

        {error && <div className="error-message">{error}</div>}

        {mode === "phone" ? (
          <form onSubmit={handlePhoneLogin} className="auth-form">
            <div className="phone-input">
              <span className="country-code">+91</span>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
                maxLength="10"
              />
            </div>

            <button type="submit" className="submit-btn">
              Continue
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => setMode("email")}
            >
              Login with Email
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailLogin} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Login
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => setMode("phone")}
            >
              Login with Phone
            </button>
            <p className="auth-footer">
                   Don't have an account? <a href="/register">Register here</a>
            </p>
            <p className="auth-footer">
            <a href="/forgot-password">Forgot_Password?</a>
              </p>
          </form>
          
        )}
      </div>
    </div>
  );
}
