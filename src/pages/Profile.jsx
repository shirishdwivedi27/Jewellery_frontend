import { useAuth } from "../auth/AuthContext";
import "../styles/Profile.css";

const Profile = () => {
  const { user } = useAuth();   // ✅ get user from context

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "100px" }}>
      Please login to view your profile
    </p>;
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <img
          src="https://i.pravatar.cc/150?img=32"
          alt="Profile"
          className="profile-avatar"
        />
        <h2>{user.username || "Valued Customer"}</h2>
        <p className="profile-email">{user.email}</p>
      </div>

      {/* Profile Info */}
      <div className="profile-content">
        <div className="profile-card">
          <h3>👤 Personal Details</h3>
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {user.created_at || "—"}</p>
        </div>

        <div className="profile-card">
          <h3>🛍️ Orders</h3>
          <p>View and track your jewellery orders.</p>
          <button className="profile-btn">My Orders</button>
        </div>

        <div className="profile-card">
          <h3>💎 Bespoke Journey</h3>
          <p>Customize jewellery made exclusively for you.</p>
          <button className="profile-btn">Start Customization</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
