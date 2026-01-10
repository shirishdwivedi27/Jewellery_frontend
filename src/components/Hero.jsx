
import { useEffect, useState } from "react";
import "../styles/Hero.css";

const slides = [
  {
    image: "/pic24.jpg",
    lines: [
      { text: "WHY TO SETTLE FROM", color: "gold" },
      { text: "LIMITED OPTIONS", color: "gold" },
      { text: "YOUR JEWELLER HAS,", color: "gold" },
      { text: "CREATE YOUR OWN DESIGNS", color: "white" },
    ],
  },
  {
    image: "/pic26.jpg",
    lines: [
      { text: "CUSTOMISED", color: "gold" },
      { text: "DESIGNS AT BEST QUALITY,", color: "gold" },
      { text: "BEST FINISH & BEST RATE", color: "white" },
    ],
  },
  {
    image: "/pic3.jpg",
    lines: [
      { text: "UNIQUE JEWELLERY", color: "white" },
      { text: "FOR UNIQUE YOU", color: "gold" },
    ],
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () =>
    setCurrent(current === 0 ? slides.length - 1 : current - 1);

  const nextSlide = () =>
    setCurrent((current + 1) % slides.length);

  return (
    <section className="hero">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`hero-slide ${index === current ? "active" : ""}`}
        >
          {/* LEFT TEXT */}
          <div className="hero-left">
            {slide.lines.map((line, i) => (
              <h1
                key={i}
                className={line.color === "gold" ? "gold" : "white"}
              >
                {line.text}
              </h1>
            ))}
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="hero-right"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </div>
      ))}

      {/* Controls */}
      <button className="hero-control prev" onClick={prevSlide}>
        PREV
      </button>
      <button className="hero-control next" onClick={nextSlide}>
        NEXT
      </button>
    </section>
  );
}
