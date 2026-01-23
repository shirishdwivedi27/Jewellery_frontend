import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/OrderDetails.css";

export default function OrderDetail() {
  const { order_id } = useParams(); // get order id from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (order_id) {
      axios
        .get(`/api/orders/${order_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((res) => setOrder(res.data))
        .catch((err) => setError(err.response?.data?.msg || err.message))
        .finally(() => setLoading(false));
    }
  }, [order_id]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="order-detail">
      <h1>Order #{order.id}</h1>

      <div className="order-info">
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Customer:</strong> {order.customer_name || "N/A"}</p>
        <p><strong>Email:</strong> {order.customer_email || "N/A"}</p>
        <p><strong>Phone:</strong> {order.customer_phone || "N/A"}</p>
        <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
        <p><strong>Total Amount:</strong> ₹{order.total_amount}</p>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="order-items">
          <h2>Items in this order:</h2>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{item.price} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="order-actions">
        {/* Optional: You can add buttons to update status here */}
      </div>
    </div>
  );
}
