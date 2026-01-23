import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const navigate = useNavigate();

 const handleAddToCart = async (e) => {
  e.stopPropagation();

  if (!user) {
    navigate("/login");
    return;
  }


    // https://flask-api-s.onrender.com
    // http://localhost:5000

  try {
    const token = localStorage.getItem("access_token");

    const res = await fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product added to cart 🛒");
    } else {
      alert(data.msg || "Failed to add to cart");
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Something went wrong");
  }
};

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-image-container">
        <img 
          src={product.images || "https://via.placeholder.com/300x400?text=Product"} 
          alt={product.name} 
          className="product-image"
        />
        <div className="product-overlay">
          <button className="quick-view-btn">Quick View 👁️</button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category || "Jewelry"}</p>
        <p className="product-price">{product.price}</p>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
