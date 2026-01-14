import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/api";
import "../styles/ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => setProduct(res.data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div className="loading">Loading product details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="detail-image">
          <img 
            src={product.images || "https://via.placeholder.com/500x600?text=Product"} 
            alt={product.name}
          />
        </div>
        
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-category">{product.category || "Jewelry"}</p>
          
          <p className="detail-price">{product.price}</p>
          
          {product.description && (
            <div className="detail-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          <div className="detail-actions">
            <button className="add-to-cart-btn">Add to Cart</button>
            <button className="wishlist-btn">♥ Add to Wishlist</button>
          </div>

          {product.stock && (
            <p className="stock-info">Stock: {product.stock} available</p>
          )}

          <div className="detail-trust">
            <p>✓ 100% Genuine</p>
            <p>✓ Free Shipping on Orders Above ₹2,000</p>
            <p>✓ 30-Day Return Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}