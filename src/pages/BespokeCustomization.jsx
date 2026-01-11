import "../styles/Bespoke.css";

export default function BespokeCustomization() {
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

      {/* CTA */}
      <section className="bespoke-cta">
        <h2>Start Your Custom Journey</h2>
        <p>Contact us today and let us design something extraordinary.</p>
        <button>Request Custom Design</button>
      </section>
    </div>
  );
}
