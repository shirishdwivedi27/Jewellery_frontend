import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

import "../styles/ProductList.css";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log("All Products:", res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Failed to load products");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="product-list-page page-offset">
      <div className="container">
        <div className="breadcrumb">
          <button onClick={() => navigate("/")} className="breadcrumb-link">Home</button>
          <span> / </span>
          <span>All Products</span>
        </div>

        <h1 className="page-title">All Products</h1>
        
        {error && <p className="error-message">Error: {error}</p>}
        
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && !error && (
          <p className="no-products">No products available</p>
        )}
      </div>

    </div>
  );
}
