
import { useEffect, useRef } from "react";
import "../styles/IntroBanner.css";

export default function IntroBanner() {
  const introRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      },
      {
        threshold: 0.4, // 40% visible hone par animation start
      }
    );

    if (introRef.current) {
      observer.observe(introRef.current);
    }

    return () => {
      if (introRef.current) observer.unobserve(introRef.current);
    };
  }, []);

  return (
    <section
      ref={introRef}                
      className="intro-hero"          
      style={{
        backgroundImage:
          // "url('https://img.freepik.com/premium-photo/collection-jewelry-including-one-that-says-gold_1086760-209521.jpg?semt=ais_hybrid&w=740&q=80')",
      "url('Intro.jpg')"
        }}
    >
      {/* overlay */}
      <div className="intro-overlay"></div>

      {/* frame */}
      <div className="intro-frame">
        <div className="intro-content">
          <h1>Hridika Jewellery</h1>

          <p>
            At Hridika Jewellery, we believe that jewellery is more 
            than an accessory—it is a reflection of emotions, traditions, 
            and stories that last a lifetime. Rooted in elegance and 
            inspired by heritage, our brand is dedicated to creating 
            exquisite jewellery that celebrates beauty in its most timeless form.
          </p>

          <button className="intro-btn">Shop Now</button>
        </div>
      </div>
    </section>
  );
}
