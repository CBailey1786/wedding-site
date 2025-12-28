import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import Toast from "./Toast";
import "./Toast.css";

const ToastContext = createContext(undefined);

const EXIT_MS = 220;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const reallyRemove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    setTimeout(() => reallyRemove(id), EXIT_MS);
  }, [reallyRemove]);

  const showToast = useCallback((type, message, timeout = 4000) => {
    const id = (globalThis.crypto?.randomUUID?.() ?? String(Date.now() + Math.random()));

    setToasts((prev) => [...prev, { id, type, message, leaving: false }]);

    if (timeout !== 0) {
      setTimeout(() => dismiss(id), timeout);
    }

    return id;
  }, [dismiss]);

  const api = useMemo(() => ({
    success: (msg, timeout) => showToast("success", msg, timeout),
    error: (msg, timeout) => showToast("error", msg, timeout),
    info: (msg, timeout) => showToast("info", msg, timeout),
    dismiss,
    dismissAll: () => {
      // mark all leaving, then remove
      setToasts((prev) => prev.map((t) => ({ ...t, leaving: true })));
      setTimeout(() => setToasts([]), EXIT_MS);
    },
  }), [showToast, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            type={t.type}
            message={t.message}
            leaving={t.leaving}
            onClose={() => dismiss(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
