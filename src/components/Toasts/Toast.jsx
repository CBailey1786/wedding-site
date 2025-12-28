import "./Toast.css";

const TOAST_CONFIG = {
  success: { title: "Success", color: "#4ade80", icon: "✓" },
  error:   { title: "Error",   color: "#f87171", icon: "!" },
  info:    { title: "Info",    color: "#60a5fa", icon: "i" },
};

export default function Toast({ type = "info", message, leaving = false, onClose }) {
  const cfg = TOAST_CONFIG[type];

  return (
    <div className={`toast ${leaving ? "toast--leaving" : "toast--enter"}`}>
      <div className="toast-accent" style={{ backgroundColor: cfg.color }} />
      <div className="toast-icon" style={{ color: cfg.color }}>
        {cfg.icon}
      </div>

      <div className="toast-content">
        <div className="toast-title">{cfg.title}</div>
        <div className="toast-message">{message}</div>
      </div>

      <button className="toast-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
