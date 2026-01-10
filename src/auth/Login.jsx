
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
// import "../styles/Auth.css";

// export default function Login({ isModal = false, onSuccess })  {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

    
//     try {
//     const userData = await login(email, password);
//     //console.log(userData);
//     if (onSuccess) {
//       onSuccess(); // close modal
//       return;
//     }
    
//     if (userData.role === "admin") {
//       navigate("/admin", { replace: true });
//     } else {
//       navigate("/products-dashboard", { replace: true });
//     }

//   } catch (err) {
//     setError(err.response?.data?.msg || "Login failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
//   };

//   return (
//     <div className={isModal ? "" : "auth-container"}>
//       <div className="auth-card">
//         <h1 className="auth-title">Login</h1>
//         <p className="auth-subtitle">Welcome back to Shirish Jewels</p>

//         <form onSubmit={handleLogin} className="auth-form">
//           {error && <div className="error-message">{error}</div>}

//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="forgot-password-link">
//             <a href="/forgot-password">Forgot Password?</a>
//           </div>

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {!isModal && (
//           <p className="auth-footer">
//               Don't have an account? <a href="/register">Register here</a>
//           </p>
//           )}
//       </div>
//     </div>
//   );
// }



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
          </form>
        )}
      </div>
    </div>
  );
}
