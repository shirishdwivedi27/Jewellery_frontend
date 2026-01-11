import Login from "../auth/Login";
import "../styles/Auth.css";

export default function LoginPrompt({ onClose }) {
  return (
    <div className="auth-overlay">
      <div className="auth-card modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <Login
          isModal={true}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
