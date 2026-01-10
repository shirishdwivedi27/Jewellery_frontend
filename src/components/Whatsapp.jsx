import React from "react";
import { createPortal } from "react-dom";
import "../styles/Whatsapp.css";

export default function Whatsapp() {
  const WHATSAPP_NUMBER = "919151006579";
  const MESSAGE = "Hello, I want to know about your jewellery .";

  const openWhatsApp = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      MESSAGE
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const node = (
    <div className="wa-wrapper">
      <button
        className="wa-btn"
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
       <span className="wa-icon">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/960px-WhatsApp.svg.png" 
                alt="WhatsApp" 
                style={{ width: "24px", height: "24px" }}
            />
        </span>
      </button>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(node, document.body)
    : node;
}