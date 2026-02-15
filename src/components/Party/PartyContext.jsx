import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";

const PartyContext = createContext(null);

export function PartyProvider({ children }) {
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reloadParty = useCallback(async () => {
    setError(null);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 10000);

    try {
      console.log("[PartyProvider] fetching /me…");

      const res = await fetch("/.netlify/functions/me", {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      console.log("[PartyProvider] /me status:", res.status);

      if (res.status === 401) {
        setParty(null);
        window.location.href = "/login";
        return null;
      }

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Failed to load party (${res.status}): ${text}`);
      }

      const json = await res.json();
      setParty(json);
      return json;
    } catch (e) {
      console.error("[PartyProvider] /me failed:", e);
      setParty(null);
      setError(e);
      return null;
    } finally {
      window.clearTimeout(timeoutId);
    }
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        await reloadParty();
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [reloadParty]);

  return (
    <PartyContext.Provider value={{ party, setParty, loading, error, reloadParty }}>
      {children}
    </PartyContext.Provider>
  );
}

export function useParty() {
  const ctx = useContext(PartyContext);
  if (!ctx) throw new Error("useParty must be used inside PartyProvider");
  return ctx;
}
