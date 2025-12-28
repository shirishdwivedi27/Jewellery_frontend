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
            <li><a href="/articles">Articles</a></li>
            <li><a href="/bangles">Bangles</a></li>
            <li><a href="/bracelets">Bracelets</a></li>
            <li><a href="/brooches">Brooches</a></li>
            <li><a href="/buttons">Buttons</a></li>
            <li><a href="/earrings">Earrings</a></li>
            <li><a href="/mala">Mala</a></li>
            <li><a href="/necklace">Necklace</a></li>
            <li><a href="/pendant">Pendant</a></li>
            <li><a href="/rings">Rings</a></li>
          </ul>
        </div>

        {/* Quick Info */}
        <div className="footer-section">
          <h4>Quick Info</h4>
          <ul>
            <li><a href="/sizing-chart">Sizing Chart</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/account">My account</a></li>
            <li><a href="/return-policy">Return & Exchange Policy</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/terms">Terms & Condition</a></li>
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
          <p><strong>Email:</strong> <a href="mailto:info@shirish.divedi951@">info@shirish.divedi951</a></p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">f</a> {/* add link in futur */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📷</a> {/* same */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Shirish Jewels. All rights reserved.</p>
      </div>
    </footer>
  );
}
