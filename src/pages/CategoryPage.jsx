import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/api";
import ProductCard from "../components/ProductCard";

import "../styles/Pages.css";

export default function CategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryNames = {
    bangles: "Bangles",
    bracelets: "Bracelets",
    brooches: "Brooches",
    buttons: "Buttons",
    earrings: "Earrings",
    mala: "Mala",
    necklace: "Necklace",
    pendant: "Pendant",
    rings: "Ring"
  };

  useEffect(() => {
    getProductsByCategory(category)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="breadcrumb-link">← Back</button>
        <h1>{categoryNames[category] || category}</h1>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="products-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {products.length === 0 && !error && (
        <p className="no-products">No products found in this category</p>
      )}


    </div>
  );
}
