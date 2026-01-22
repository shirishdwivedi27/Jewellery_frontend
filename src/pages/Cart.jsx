import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getCart, removeFromCart } from "../api/api";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";
import { KeyboardHideIcon } from "@shopify/polaris-icons";

export default function Cart() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("access_token");
  const invalidItem = cartItems.find(item => item.quantity < 10);
//  agar wo chah raha hai ki har item min 10 ho to hame cartItems   ki lenght check krni hogi mtlb 
// agar uski len 3 hai to total prod 30 hone chayie 
// line no 22{ jaha if(invalidItem )  cond hai } ki condition change hogi jisme hoga ki cartItems me mujhe loop lagake har item  ki len leke ani hogi uske bad wo len meri jydad honi chayie cartItems.length*10 ke tabhi order proceed hoga

  const handleCheckout = async () => {
  if (invalidItem) {
  alert("Each item quantity must be at least 10");
  return;
}
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

  const res = await fetch("https://flask-api-s.onrender.com/orders", {
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

//   const handleSizeChange = (productId, value) => {
//   setCartItems(prevItems =>
//     prevItems.map(item =>
//       item.product_id === productId
//         ? { ...item, size: value }
//         : item
//     )
//   );
// };


  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || "Order failed");
    return;
  }

  alert("Order placed successfully!");
  navigate("/orders");
};

const handleSizeChange = (productId, value) => {
  setCartItems(prevItems =>
    prevItems.map(item =>
      item.product_id === productId
        ? { ...item, size: value }
        : item
    )
  );
};

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    getCart()
      // .then((res) => setCartItems(res.data || []))
      .then((res) =>
       setCartItems(
      (res.data || []).map(item => ({
        ...item,
        size: ""   
      }))
    )
  )
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


    
  const updateQuantity2 = async (productId, newQty) => {
  //   if (newQty < 10) {
  //   alert("Minimum quantity is 10");
  //   return;
  // }
  try {
    const token = localStorage.getItem("access_token");
    // 1️⃣ backend update
    const res = await fetch("https://flask-api-s.onrender.com/cart/update/min", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: newQty,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update cart");
    }

    // 2️⃣ frontend state sync
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product_id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  } catch (err) {
    alert("Quantity update failed");
    console.error(err);
  }
};



  const updateQuantity = async (productId, newQty) => {
  //   if (newQty < 10) {
  //   alert("Minimum quantity is 10");
  //   return;
  // }
  try {
    const token = localStorage.getItem("access_token");
    // 1️⃣ backend update
    const res = await fetch("https://flask-api-s.onrender.com/cart/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: productId,
        quantity: newQty,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update cart");
    }

    // 2️⃣ frontend state sync
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product_id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  } catch (err) {
    alert("Quantity update failed");
    console.error(err);
  }
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

                  {/* <div className="item-size">
                    <label>Size:</label>
                    <input
                      type="text"
                      placeholder="Enter size"
                      value={item.size}
                      onChange={(e) =>
                        handleSizeChange(item.product_id, e.target.value)
                      }
                    />
                  </div> */}

                  <div className="item-size">
                    <label>Size:</label>
                    <input
                      type="text"
                      placeholder="Enter size"
                      // value={item.size}
                      value={item.size || ""}
                      onChange={(e) =>
                        handleSizeChange(item.product_id, e.target.value)
                      }
                    />
                  </div>


                  {/* <div className="item-quantity">
                    <span>Qty: {item.quantity}</span>
                  </div> */}
                  <div className="item-quantity">
                  <button
                    className="qty-btn"
                    disabled={item.quantity <= 10}
                    onClick={() =>
                      updateQuantity2(item.product_id, item.quantity - 1)
                    }
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
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
