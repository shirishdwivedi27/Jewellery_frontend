import "../styles/Footer.css";
import { useEffect, useRef } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";


export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
     <footer className="footer" ref={footerRef}>
      <div className="footer-container">

        {/* ================= LEFT : LOGO & TAGLINE ================= */}
        <div className="footer-section footer-logo-section">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSOi0UJsHKRUY3HMcFmhxZRb66idJte1TeCQ&s"
            alt="Shirish Jewels"
            className="footer-logo"
          />
          <p className="footer-tagline">
            Where ancient art meets modern elegance
          </p>
        </div>

        {/* ================= QUICK LINKS ================= */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/articles">Articles</a></li>
            <li><a href="/category/bangles">Bangles</a></li>
            <li><a href="/category/bracelets">Bracelets</a></li>
            <li><a href="/category/brooches">Brooches</a></li>
            <li><a href="/category/buttons">Buttons</a></li>
            <li><a href="/category/earrings">Earrings</a></li>
            <li><a href="/category/mala">Mala</a></li>
            <li><a href="/category/necklace">Necklace</a></li>
            <li><a href="/category/pendant">Pendant</a></li>
            <li><a href="/category/ring">Rings</a></li>
          </ul>
        </div>

        {/* ================= QUICK INFO ================= */}
        <div className="footer-section">
          <h4>Quick Info</h4>
          <ul>
            <li><a href="/sizing-chart">Sizing Chart</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/account">My Account</a></li>
            <li><a href="/return-policy">Return & Exchange Policy</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/shipping">Shipping Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* ================= QUICK CONNECT ================= */}
        <div className="footer-section">
          <h4>Quick Connect</h4>

          <address className="footer-address">
            <p>
              Greenland Apartment, 108, first floor, Babukhan Mall,<br />
              Somajiguda, Hyderabad, Telangana 500082
            </p>
          </address>

          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919398072103">+91 93980 72103</a>
          </p>

          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@shirish.divedi951">
              info@shirish.divedi951
            </a>
          </p>

          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* ================= NEWSLETTER (NEW ADDITION) ================= */}
        <div className="footer-section footer-newsletter">
          <h4>Newsletter</h4>
          <p>
            Sign up to receive exclusive offers, new arrivals & timeless designs.
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Email Address"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* ================= FOOTER BOTTOM ================= */}
      <div className="footer-bottom">
        <p>© 2026 Shirish Jewels. All rights reserved.</p>
      </div>
    </footer>
  );
}
