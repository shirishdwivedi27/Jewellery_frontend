// import { useState } from "react";
// import "../styles/Bespoke.css";
// import Footer from "../components/Footer";

// export default function BespokeCustomization() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     product: "",
//     details: "",
//     size: "",
//     images: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, images: e.target.files });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Customization request submitted successfully!");
//   };

//   return (
//     <div className="bespoke-page">
//       {/* Hero */}
//       <section className="bespoke-hero">
//         <h1>Bespoke Customisation</h1>
//         <p>Design Jewellery That Is Truly Yours</p>
//       </section>

//       {/* Steps */}
//       <section className="bespoke-steps">
//         <div className="step-card">
//           <h3>1. Choose Design</h3>
//           <p>Select a base design or share your own idea.</p>
//         </div>

//         <div className="step-card">
//           <h3>2. Select Material</h3>
//           <p>Gold, Platinum, Diamonds, or Precious Stones.</p>
//         </div>

//         <div className="step-card">
//           <h3>3. Personal Touch</h3>
//           <p>Engravings, sizes, and custom finishes.</p>
//         </div>

//         <div className="step-card">
//           <h3>4. Craft & Deliver</h3>
//           <p>Expert craftsmen bring your design to life.</p>
//         </div>
//       </section>

//       {/* FORM SECTION */}
//       <section className="bespoke-form-section">
//         <h2>Request Bespoke Custom Jewellery</h2>
//         <p>Currently available for Rings & Bangles only</p>

//         <form className="bespoke-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             onChange={handleChange}
//           />

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Contact Number (WhatsApp preferred)"
//             required
//             onChange={handleChange}
//           />

//           <div className="radio-group">
//             <label>
//               <input
//                 type="radio"
//                 name="product"
//                 value="Ring"
//                 required
//                 onChange={handleChange}
//               />
//               Ring
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 name="product"
//                 value="Bangle"
//                 onChange={handleChange}
//               />
//               Bangle
//             </label>
//           </div>

//           <textarea
//             name="details"
//             placeholder="Describe your design idea (metal, stone, style etc.)"
//             required
//             onChange={handleChange}
//           ></textarea>

//           <input
//             type="text"
//             name="size"
//             placeholder="Ring / Bangle Size"
//             required
//             onChange={handleChange}
//           />

//           {/* Image Upload */}
//           <label className="upload-label">
//             Upload Reference Images (Optional)
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleFileChange}
//             />
//           </label>

//           <button type="submit">Submit Customization Request</button>
//         </form>
//       </section>
//       <Footer/>
//       {/* CTA */}
//       {/* <section className="bespoke-cta">
//         <h2>Start Your Custom Journey</h2>
//         <p>Contact us today and let us design something extraordinary.</p>
//         <button>Request Custom Design</button>
//       </section> */}
//     </div>
//   );
// }



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
    image: null, // ✅ single image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("phone", formData.phone);
    payload.append("product", formData.product);
    payload.append("details", formData.details);
    payload.append("size", formData.size);

    if (formData.image) {
      payload.append("image", formData.image);
    }


    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("https://flask-api-s.onrender.com/api/bespoke-request", {
        method: "POST",
      headers: {
        Authorization: Bearer `${token}`,
      },
        body: payload,
      });

      const data = await res.json();
      alert("Customization request submitted successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="bespoke-page">
      {/* Hero */}
      <section className="bespoke-hero">
        <h1>Bespoke Customisation</h1>
        <p>Design Jewellery That Is Truly Yours</p>
      </section>

      {/* Steps */}
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
          ></textarea>

          <input
            type="text"
            name="size"
            placeholder="Ring / Bangle Size"
            required
            onChange={handleChange}
          />

          {/* SINGLE IMAGE UPLOAD */}
          <label className="upload-label">
            Upload Reference Image
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
            />
          </label>

          <button type="submit">Submit Customization Request</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}