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

  const [step, setStep] = useState("phone"); // phone | otp
  const [otp, setOtp] = useState("");
  const [sessionToken, setSessionToken] = useState("");


  const { login,loginset } = useAuth();
  const navigate = useNavigate();

  const handlePhoneLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (phone.length !== 10) {
    setError("Enter valid 10-digit mobile number");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/request-phone-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone })
    });

    const data = await res.json();

    setSessionToken(data.sessionToken);


    const msg = `Your login OTP is ${data.otp}. Valid for 5 minutes.`;
    const waUrl = `https://wa.me/91${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    setStep("otp");
  } catch (err) {
    setError("Failed to send OTP");
  } finally {
    setLoading(false);
  }
};

//   const handleVerifyOtp = async (e) => {
//   e.preventDefault();
//   setError("");

//   try {
//     setLoading(true);

//     const res = await fetch("http://localhost:5000/verify-phone-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         otp,
//         sessionToken
//       })
//     });

//     const data = await res.json();

  
//     const userdata=loginset(data.user, data.access_token);

//     if (onSuccess) {
//       onSuccess();
//       return;
//     }

//     navigate(userdata.role === "admin"
//       ? "/admin"
//       : "/products-dashboard"
//     );

//   } catch (err) {
//     setError("Invalid or expired OTP");
//   } finally {
//     setLoading(false);
//   }
// };

const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5000/verify-phone-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, sessionToken })
    });

    const data = await res.json();

    if (!res.ok) {
      // backend ne error return kiya
      if (data.msg === "expired") setError("OTP expired");
      else if (data.msg === "invalid") setError("Invalid OTP");
      else if (data.msg === "user_not_found") setError("User not found");
      else setError("OTP verification failed");

      return; // stop execution
    }

    // success
    const userdata = loginset(data.user, data.access_token);

    if (onSuccess) {
      onSuccess();
      return;
    }

    navigate(userdata.role === "admin" ? "/admin" : "/products-dashboard");

  } catch (err) {
    setError("Network error, try again");
  } finally {
    setLoading(false); // loading state reset
  }
};



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

      
      {mode === "phone" && step === "phone" && (
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
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Sending OTP..." : "Continue"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setMode("email")}
          >
            Login with Email
          </button>
        </form>
      )}

      
      {mode === "phone" && step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="auth-form">
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength="6"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </form>
      )}

     
      {mode === "email" && (
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

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => {
              setMode("phone");
              setStep("phone");
            }}
          >
            Login with Phone
          </button>

          <p className="auth-footer">
            Don't have an account? <a href="/register">Register here</a>
          </p>
          <p className="auth-footer">
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </form>
      )}
    </div>
  </div>
);
}