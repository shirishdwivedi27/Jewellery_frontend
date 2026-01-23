import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getCart, removeFromCart } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");

  const handleCheckout = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    navigate("/login");
    return;
  }

  const address = prompt("Enter delivery address");
  if (!address) {
    alert("Address is required");
    return;
  }

    // https://flask-api-s.onrender.com
    // http://localhost:5000

  const res = await fetch("http://localhost:5000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      address,
      payment_method: "COD",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || "Order failed");
    return;
  }

  alert("Order placed successfully!");
  navigate("/orders");
};


  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getCart()
      .then((res) => setCartItems(res.data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleRemove = (productId) => {
    removeFromCart(productId)
      .then(() => {
        setCartItems(cartItems.filter((item) => item.product_id !== productId));
      })
      .catch((err) => alert("Error removing item: " + err.message));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => {
      const price = parseInt(item.price?.replace(/[^\d]/g, "") || 0);
      return sum + price * item.quantity;
    },
    0
  );

  if (loading) return <div className="loading">Loading cart...</div>;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Your Cart</h1>

        {error && <div className="error">{error}</div>}

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate("/products-dashboard")} className="continue-btn">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.product_id} className="cart-item">
                  <img 
                    src={item.images || "https://via.placeholder.com/100"} 
                    alt={item.name}
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                  </div>
                  <div className="item-quantity">
                    <span>Qty: {item.quantity}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            <button className="checkout-btn" onClick={handleCheckout}>
  Proceed to Checkout
</button>

              <button 
                className="continue-btn"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
