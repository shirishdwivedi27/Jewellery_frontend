
import { useEffect, useRef, useState } from "react";
import "../styles/FeatureBanner.css";

export default function FeatureBanner() {
  const bannerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={bannerRef}
      className={`image-banner ${visible ? "show" : ""}`}
    >
      <img
        src="SkinBanner.png"
        alt="Handcrafted Jewellery Features"
      />
    </section>
  );
}
