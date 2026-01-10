// AdminButton.jsx
import "../styles/AdminButton.css";
import { useNavigate } from "react-router-dom";

const AdminButton = () => {
  const navigate = useNavigate();

  return (
    <button className="admin-btn" onClick={() => navigate("/admin")}>
      Admin
    </button>
  );
};

export default AdminButton;
