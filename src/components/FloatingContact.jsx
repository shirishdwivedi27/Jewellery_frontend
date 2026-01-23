import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/FloatingContact.css";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("https://flask-api-s.onrender.com/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      console.log(form);
      if (res.ok) {
        setStatus({ ok: true, text: "Message sent successfully." });
        setForm({name: "", email: "", mobile: "", subject: "", message: "" });
        setOpen(false);
      } else {
        const txt = await res.text();
        setStatus({ ok: false, text: txt || "Failed to send message." });
      }
    } catch (err) {
      setStatus({ ok: false, text: err.message });
    } finally {
      setSending(false);
    }
  };

  const node = (
    <div className={`fc-wrapper ${open ? "open" : ""}`}>
      <button
        className="fc-btn"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open contact form"
        title="Help"
      >
        <div className="fc-icon">HELP ?</div>
      </button>

      <div className="fc-panel" aria-hidden={!open}>
        <form className="fc-form" onSubmit={handleSubmit}>
          <div className="fc-row">
            <label>Your name: *</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="fc-row">
            <label>Mobile: *</label>
            <input name="mobile" value={form.mobile} onChange={handleChange} required />
          </div>

          <div className="fc-row">
            <label>E-mail: *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="fc-row">
            <label>Subject: *</label>
            <input name="subject" value={form.subject} onChange={handleChange} required />
          </div>

          <div className="fc-row">
            <label>Message: *</label>
            <textarea name="message" value={form.message} onChange={handleChange} required />
          </div>

          <button type="submit" className="fc-send" disabled={sending}>
            {sending ? "Sending..." : "Send"}
          </button>
        </form>

        {status && (
          <div className={`fc-status ${status.ok ? "ok" : "error"}`}>{status.text}</div>
        )}
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(node, document.body) : node;
}
