import { useCallback, useEffect, useState } from "react";

export function useParty() {
  const [party, setParty] = useState(null);
  const [loading, setLoading] = useState(true);

  const reloadParty = useCallback(async () => {
    const res = await fetch("/.netlify/functions/me", { credentials: "include" });

    if (res.status === 401) {
      window.location.href = "/login";
      return null;
    }
    if (!res.ok) throw new Error("Failed to load party");

    const json = await res.json();
    setParty(json);
    return json;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await reloadParty();
      } finally {
        setLoading(false);
      }
    })();
  }, [reloadParty]);

  return { party, loading, reloadParty, setParty };
}
