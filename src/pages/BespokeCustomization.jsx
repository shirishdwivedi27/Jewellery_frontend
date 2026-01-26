import { useState } from "react";
import "../styles/Bespoke.css";
import Footer from "../components/Footer";

export default function BespokeCustomization() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: "",
    details: "",
    size: "",
    image: null,
  });

  /* ---------------- IMAGE → BASE64 ---------------- */
  // const fileToBase64 = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file); // includes mime type
  //     reader.onload = () => resolve(reader.result);
  //     reader.onerror = (err) => reject(err);
  //   });
  // };
 
  const handleImageSelect = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onloadend = () => {
    setForm({ ...form, image: reader.result }); // ✅ base64 URL
  };
  reader.readAsDataURL(file);
};
  /* ---------------- INPUT HANDLERS ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    let base64Image = null;
    if (formData.image) {
      base64Image = await fileToBase64(formData.image);
    }

    const payload = {
      name: formData.name,
      phone: formData.phone,
      product: formData.product,
      details: formData.details,
      size: formData.size,
      image: formData.image, // ✅ base64 string
    };

    const token = localStorage.getItem("access_token");

    try {
      const res = await fetch("https://flask-api-s.onrender.com/api/bespoke-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert("Customization request submitted successfully!");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bespoke-page">
      {/* HERO */}
      <section className="bespoke-hero">
        <h1>Bespoke Customisation</h1>
        <p>Design Jewellery That Is Truly Yours</p>
      </section>

      {/* STEPS */}
      <section className="bespoke-steps">
        <div className="step-card">
          <h3>1. Choose Design</h3>
          <p>Select a base design or share your own idea.</p>
        </div>
        <div className="step-card">
          <h3>2. Select Material</h3>
          <p>Gold, Platinum, Diamonds, or Precious Stones.</p>
        </div>
        <div className="step-card">
          <h3>3. Personal Touch</h3>
          <p>Engravings, sizes, and custom finishes.</p>
        </div>
        <div className="step-card">
          <h3>4. Craft & Deliver</h3>
          <p>Expert craftsmen bring your design to life.</p>
        </div>
      </section>

      {/* FORM */}
      <section className="bespoke-form-section">
        <h2>Request Bespoke Custom Jewellery</h2>
        <p>Currently available for Rings & Bangles only</p>

        <form className="bespoke-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Contact Number (WhatsApp preferred)"
            required
            onChange={handleChange}
          />

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="product"
                value="Ring"
                required
                onChange={handleChange}
              />
              Ring
            </label>
            <label>
              <input
                type="radio"
                name="product"
                value="Bangle"
                onChange={handleChange}
              />
              Bangle
            </label>
          </div>

          <textarea
            name="details"
            placeholder="Describe your design idea"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="size"
            placeholder="Ring / Bangle Size"
            required
            onChange={handleChange}
          />
{/* 
          <label className="upload-label">
            Upload Reference Image
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
            />
          </label> */}

            <label className="upload-label">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect} // <-- converts image to base64 and sets form.images
          />

          <button type="submit">Submit Customization Request</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}