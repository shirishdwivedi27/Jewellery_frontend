import { useNavigate } from "react-router-dom";
import "../styles/AdminButton.css";

const AdminButton = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  if (!storedUser) return null;

  const user = JSON.parse(storedUser);

  if (user.role !== "admin") return null; 

  return (
    <button className="admin-btn" onClick={() => navigate("/admin")}>
      Admin
    </button>
  );
};

export default AdminButton;
