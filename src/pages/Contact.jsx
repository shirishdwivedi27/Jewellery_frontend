import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitContact } from "../api/api";
import "../styles/Pages.css";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      //  setError(err);
      setError("Failed to submit form. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <button onClick={() => navigate("/")} className="breadcrumb-link">← Back</button>
        <h1>Contact Us</h1>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>Greenland Apartment, 108, first floor,<br />babukhan mall, Somajiguda,<br />Hyderabad, Telangana 500082</p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p><a href="tel:+919398072103">+91-93980 72103</a></p>
          </div>
          <div className="info-item">
            <h3>✉️ Email</h3>
            <p><a href="mailto:info@shirish.divedi951@gmail.com">info@shirish.divedi951@gmail.com</a></p>
          </div>
          <div className="info-item">
            <h3>🕐 Business Hours</h3>
            <p>Monday - Saturday: 10:00 AM - 7:00 PM<br />Sunday: Closed</p>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          {submitted && <p className="success-message">Thank you! We'll get back to you soon.</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>


    </div>
  );
}
