import { Link } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-section footer-logo-section">
          <img
            src="logohridika.png"
            alt="Hridika Jewels"
            className="footer-logo"
          />
          <p className="footer-tagline">
            Where ancient art meets modern elegance
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/category/bangles">Bangles</Link></li>
            <li><Link to="/category/brooches">Brooches</Link></li>
            <li><Link to="/category/necklace">Necklace</Link></li>
            <li><Link to="/category/rings">Rings</Link></li>
          </ul>
        </div>

        {/* Quick Info */}
        <div className="footer-section">
          <h4>Quick Info</h4>
          <ul>
            <li><Link to="/sizing-chart">Sizing Chart</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/policy/privacy">Privacy Policy</Link></li>
            <li><Link to="/policy/shipping">Shipping Policy</Link></li>
            <li><Link to="/policy/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Quick Connect</h4>

          <address>
            <p>Greenland Apartment, 108, First Floor</p>
            <p>Babukhan Mall, Somajiguda</p>
            <p>Hyderabad, Telangana – 500082</p>
          </address>

          <p><strong>Phone:</strong> +91 93980 72103</p>
          <p><strong>Email:</strong> info@shirish.divedi951@gmail.com</p>

          {/* Social Icons (TEXT BASED) */}
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              f
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              ig
            </a>
            <a href="https://wa.me/919398072103" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              wa
            </a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Hridika Jewels. All rights reserved.</p>
      </div>
    </footer>
  );
}
