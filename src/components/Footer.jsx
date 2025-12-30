import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left: Logo & About */}
        <div className="footer-section footer-logo-section">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOi0UJsHKRUY3HMcFmhxZRb66idJte1TeCQ&s"
            alt="Shirish Jewels"
            className="footer-logo"
          />
          <p className="footer-tagline">Where ancient art meets modern elegance</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/category/bangles">Bangles</Link></li>
            <li><Link to="/category/bracelets">Bracelets</Link></li>
            <li><Link to="/category/brooches">Brooches</Link></li>
            <li><Link to="/category/buttons">Buttons</Link></li>
            <li><Link to="/category/earrings">Earrings</Link></li>
            <li><Link to="/category/mala">Mala</Link></li>
            <li><Link to="/category/necklace">Necklace</Link></li>
            <li><Link to="/category/pendant">Pendant</Link></li>
            <li><Link to="/category/rings">Rings</Link></li>
          </ul>
        </div>

        {/* Quick Info */}
        <div className="footer-section">
          <h4>Quick Info</h4>
          <ul>
            <li><Link to="/sizing-chart">Sizing Chart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/account">My account</Link></li>
            <li><Link to="/policy/return">Return & Exchange Policy</Link></li>
            <li><Link to="/policy/privacy">Privacy Policy</Link></li>
            <li><Link to="/policy/shipping">Shipping Policy</Link></li>
            <li><Link to="/policy/terms">Terms & Condition</Link></li>
          </ul>
        </div>

        {/* Quick Connect */}
        <div className="footer-section">
          <h4>Quick Connect</h4>
          <address>
            <p>Greenland Apartment, 108, first floor, babukhan mall,</p>
            <p>Somajiguda, Hyderabad, Telangana 500082</p>
          </address>
          <p><strong>Phone:</strong> <a href="tel:+919398072103">+91-93980 72103</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@shirish.divedi951@gmail.com">info@shirish.divedi951@gmail.com</a></p>
          <div className="social-links">
            <a href="https://facebook.com/shirishjewels" target="_blank" rel="noopener noreferrer" title="Facebook">f</a>
            <a href="https://instagram.com/shirishjewels" target="_blank" rel="noopener noreferrer" title="Instagram">📷</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Shirish Jewels. All rights reserved.</p>
      </div>
    </footer>
  );
}
