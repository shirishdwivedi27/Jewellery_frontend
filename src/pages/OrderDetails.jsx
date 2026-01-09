import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(o => o.id == id);
        setOrder(found);
      })
      .finally(() => setLoading(false));
  }, [id, navigate, token]);

  if (loading) return <div className="loading">Loading order...</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="order-details-page">
      <h1>Order #{order.id}</h1>

      <div className="order-box">
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment:</strong> {order.payment_method}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
      </div>

      <OrderTimeline status={order.status} />

      <button onClick={() => navigate("/orders")} className="back-btn">
        Back to Orders
      </button>
    </div>
  );
}
