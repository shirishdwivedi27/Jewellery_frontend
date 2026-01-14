import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getCategories } from "../api/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../auth/AuthContext";
import "../styles/FilteredProducts.css";

export default function FilteredProducts() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedShopFor, setSelectedShopFor] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);

  const priceRanges = [
    { label: "₹0 - ₹50,000", min: 0, max: 50000 },
    { label: "₹50,001 - ₹1,00,000", min: 50001, max: 100000 },
    { label: "₹1,00,001 - ₹1,50,000", min: 100001, max: 150000 },
    { label: "₹1,50,001 - ₹2,00,000", min: 150001, max: 200000 },
  ];

  const materials = ["Gold", "Diamond", "Gemstone", "Silver"];
  const metals = ["22 KT Yellow", "18 KT Yellow", "14 KT Yellow"];
  const sizes = ["2.2", "2.4", "2.5", "2.6", "2.7", "2.8", "2.10"];
  const shopForOptions = ["Women", "Men"];
  const occasions = ["Wedding", "Work Wear", "Daily Wear", "Evening", "Party wear"];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply all filters
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedPriceRange) {
      filtered = filtered.filter(
        (p) =>
          parseFloat(p.price) >= selectedPriceRange.min &&
          parseFloat(p.price) <= selectedPriceRange.max
      );
    }

    if (selectedMaterial) {
      filtered = filtered.filter((p) => p.material === selectedMaterial);
    }

    if (selectedMetal) {
      filtered = filtered.filter((p) => p.metal === selectedMetal);
    }

    if (selectedSize) {
      filtered = filtered.filter((p) => p.size === selectedSize);
    }

    if (selectedShopFor) {
      filtered = filtered.filter((p) => p.shopFor === selectedShopFor);
    }

    if (selectedOccasion) {
      filtered = filtered.filter((p) => p.occasion === selectedOccasion);
    }

    setFilteredProducts(filtered);
  }, [
    products,
    selectedCategory,
    selectedPriceRange,
    selectedMaterial,
    selectedMetal,
    selectedSize,
    selectedShopFor,
    selectedOccasion,
  ]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="filtered-products-page">
      <div className="filtered-container">
        {/* Left Sidebar - Filters */}
        <aside className="filters-sidebar">
          <h3 className="filters-title">Filters</h3>

          {/* Category Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Category</h4>
            <div className="category-list">
              <label className="filter-item">
                <input
                  type="checkbox"
                  checked={selectedCategory === null}
                  onChange={() => setSelectedCategory(null)}
                />
                <span>All Products</span>
              </label>

              {categories.map((category) => (
                <label key={category} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Price</h4>
            <div className="filter-options">
              {priceRanges.map((range, idx) => (
                <label key={idx} className="filter-item">
                  <input
                    type="checkbox"
                    checked={
                      selectedPriceRange?.min === range.min &&
                      selectedPriceRange?.max === range.max
                    }
                    onChange={() => setSelectedPriceRange(range)}
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Material Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Material</h4>
            <div className="filter-options">
              {materials.map((material) => (
                <label key={material} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedMaterial === material}
                    onChange={() => setSelectedMaterial(material)}
                  />
                  <span>{material}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Metal Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Metal</h4>
            <div className="filter-options">
              {metals.map((metal) => (
                <label key={metal} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedMetal === metal}
                    onChange={() => setSelectedMetal(metal)}
                  />
                  <span>{metal}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Size</h4>
            <div className="filter-options">
              {sizes.map((size) => (
                <label key={size} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Shop For Filter */}
          {/*<div className="filter-section">
            <h4 className="filter-heading">Shop For</h4>
            <div className="filter-options">
              {shopForOptions.map((option) => (
                <label key={option} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedShopFor === option}
                    onChange={() => setSelectedShopFor(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>*/}

          {/* Occasion Filter */}
          <div className="filter-section">
            <h4 className="filter-heading">Occasion</h4>
            <div className="filter-options">
              {occasions.map((occasion) => (
                <label key={occasion} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedOccasion === occasion}
                    onChange={() => setSelectedOccasion(occasion)}
                  />
                  <span>{occasion}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Side - Products */}
        <main className="products-content">
          <div className="products-header">
            <h2>
              {selectedCategory
                ? `${selectedCategory} Collection`
                : "All Products"}
            </h2>
            <p className="product-count">
              {filteredProducts.length} products found
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found matching your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}