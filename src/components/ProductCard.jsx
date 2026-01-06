// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../auth/AuthContext";
// import "../styles/ProductCard.css";

// export default function ProductCard({ product }) {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleAddToCart = (e) => {
//     e.stopPropagation();
//     if (!user) {
//       navigate("/login");
//     } else {
//       // TODO: Add to cart logic
//       alert(`Added ${product.name} to cart`);
//     }
//   };

//   const handleProductClick = () => {
//     navigate(`/products/${product.id}`);
//   };

//   return (
//     <div className="product-card" onClick={handleProductClick}>
//       <div className="product-image-container">
//         <img 
//           src={product.images || "https://via.placeholder.com/300x400?text=Product"} 
//           alt={product.name} 
//           className="product-image"
//         />
//         <div className="product-overlay">
//           <button className="quick-view-btn">Quick View</button>
//         </div>
//       </div>
      
//       <div className="product-info">
//         <h3 className="product-name">{product.name}</h3>
//         <p className="product-category">{product.category || "Jewellery"}</p>
//         <p className="product-price">{product.price}</p>
//         <button 
//           className="add-to-cart-btn"
//           onClick={handleAddToCart}
//         >
//           Add to cart
//         </button>
//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="gallery-card" onClick={handleProductClick}>
      <div className="gallery-image-wrapper">
        <img
          src={product.images || "https://via.placeholder.com/400"}
          alt={product.name}
          className="gallery-image"
        />
      </div>

      <div className="gallery-info">
        <p className="gallery-title">
          {product.name || "Product Image"}
        </p>
      </div>
    </div>
  );
}
