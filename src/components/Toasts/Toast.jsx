import "./Toast.css";
import CheckIcon from "../../assets/icons/check_white.svg?react";
import ExclamationIcon from "../../assets/icons/exclamation_white.svg?react";
import InfoIcon from "../../assets/icons/info_white.svg?react";

const TOAST_CONFIG = {
  success: { title: "Success", color: "#08A565", icon: CheckIcon },
  error:   { title: "Error",   color: "#e85757ff", icon: ExclamationIcon },
  info:    { title: "Info",    color: "#2D5341", icon: InfoIcon },
};

export default function Toast({ type = "info", message, leaving = false }) {
  const cfg = TOAST_CONFIG[type];
  const Icon = cfg.icon;

  return (
    <div
      className={`toast ${leaving ? "toast--leaving" : "toast--enter"}`}
      style={{ backgroundColor: cfg.color }}
    >
      <div className="toast-icon">
          <Icon style={{ fill: cfg.color }} />

      </div>

      <div className="toast-message">{message}</div>
    </div>
  );
}
