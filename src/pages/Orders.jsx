//import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
//import "../styles/Orders.css";

//export default function Orders() {
  //const navigate = useNavigate();
  //const [orders, setOrders] = useState([]);
  //const [loading, setLoading] = useState(true);

  //const token = localStorage.getItem("access_token");

  //useEffect(() => {
    //if (!token) {
      //navigate("/login");
      //return;
    //}

    //fetch("http://localhost:5000/orders", {
      //headers: {
      //  Authorization: `Bearer ${token}`,
      //},
    //})
     // .then((res) => res.json())
     // .then((data) => setOrders(data))
     // .catch(() => alert("Failed to load orders"))
     // .finally(() => setLoading(false));
 // }, [navigate, token]);

  //if (loading) {
   // return <div className="orders-loading">Loading orders...</div>;
  //}

 // return (
   // <div className="orders-page">
     // <h1 className="orders-title">My Orders</h1>
        
      //{orders.length === 0 ? (
        //<div className="orders-empty">
         // <h2>No Orders Yet</h2>
         // <button onClick={() => navigate("/")}>Shop Now</button>
       // </div>
     // ) : (
       // <div className="orders-list">
        //  {orders.map((order) => (
            //<div key={order.id} className="order-card">
             // <div className="order-header">
              //  <div>
                //  <p className="order-id">Order #{order.id}</p>
                 // <p className="order-date">
                  //  {new Date(order.created_at).toDateString()}
                  //</p>
                //</div>

                //<span className={`order-status`}>
                  //{order.status}
                //</span>
            //  </div>

              //<div className="order-body">
               // <p><strong>Address:</strong> {order.address}</p>
               // <p><strong>Payment:</strong> {order.payment_method}</p>
             // </div>
            //</div>
         // ))}
        //</div>
     // )}
    //</div>
 // );
//}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("https://flask-api-s.onrender.com/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => alert("Failed to load orders"))
      .finally(() => setLoading(false));
  }, [navigate, token]);

  if (loading) {
    return <div className="orders-loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <h2>No Orders Yet</h2>
          <button onClick={() => navigate("/")}>Shop Now</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              
              {/* HEADER */}
              <div className="order-header">
                <div>
                  <p className="order-id">ORD-{order.id}</p>
                  <p className="order-date">
                    {new Date(order.created_at).toDateString()}
                  </p>
                </div>

                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-divider"></div>

              {/* BODY */}
              <div className="order-body">
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Payment:</strong> {order.payment_method}</p>
              </div>

              {/* FOOTER */}
              <div className="order-actions">
                <button
                  className="order-link"
                  onClick={() => navigate(`/api/orders/${order.id}`)}
                >
                  View Details
                </button>

                <button
                  className="order-link"
                  onClick={() => navigate(`/track/${order.id}`)}
                >
                  Track Order
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
