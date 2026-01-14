
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import "../styles/Home.css";
import Hero from "../components/Hero";
import IntroBanner from "../components/IntroBanner";
import FeatureBanner from "../components/FeatureBanner";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log("Products:", res.data);
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
    <div className="home">
      <Hero/>
      <FeatureBanner/>
      <IntroBanner/>
     
      {/* Products Section */}
     <section className="products-section">
        <div className="container">
          <h2 className="section-title">Featured Collection</h2>
          
          {error && <p className="error-message">Error: {error}</p>}
          
          {products.length > 8 ? (
            <div className="products-carousel">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}

          {products.length === 0 && !error && (
            <p className="no-products">No products available</p>
          )}
        </div>
      </section>

      {/* Most Popular Section */}
     <section className="popular-section">
        <div className="container">
          <h2 className="section-title">Most Popular</h2>
          <div className="products-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="explore-btn-container">
            <button className="explore-all-btn" onClick={() => navigate("/products")}>EXPLORE ALL PRODUCTS</button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      {/* <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-card">
              <div className="trust-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Above 2lakhs cart value</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">♻️</div>
              <h3>30 Days Return</h3>
              <p>Please review all the terms</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">⭐</div>
              <h3>100% Genuine</h3>
              <p>We provide 92.5% Pure Silver</p>
            </div>
            <div className="trust-card">
              <div className="trust-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>With Razorpay, your payment is secure</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </div>
  );
}

