import Footer from "../components/Footer";
import "../styles/About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Hridika Jewels</h1>
        <p>Timeless Elegance. Crafted With Love.</p>
      </section>

      {/* Content Section */}
      <section className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Hridika Jewels was founded with a passion for creating jewellery
            that celebrates elegance, beauty, and individuality.
            Each piece tells a story of craftsmanship and trust.
          </p>

          <h2>Our Promise</h2>
          <ul>
            <li>✨ Premium Quality Materials</li>
            <li>✨ Authentic & Certified Jewellery</li>
            <li>✨ Elegant & Timeless Designs</li>
            <li>✨ Customer Satisfaction First</li>
          </ul>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1"
            alt="Jewellery Crafting"
          />
        </div>
      </section>
      <Footer/>
    </div>
    
  );
}
