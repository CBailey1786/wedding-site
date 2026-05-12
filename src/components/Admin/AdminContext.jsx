import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

const AdminContext = createContext(null);

async function fetchJson(url, { timeoutMs = 15000 } = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    const text = await res.text().catch(() => "");
    console.log("[AdminContext] fetch", url, "status", res.status, "body:", text.slice(0, 500));

    if (res.status === 401) {
      window.location.href = "/login";
      return null;
    }

    if (!res.ok) {
      throw new Error(`Request failed (${res.status}): ${text}`);
    }

    return text ? JSON.parse(text) : null;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function AdminProvider({ children }) {
  // Dataset 1: responses
  const [responses, setResponses] = useState(null);

  // Dataset 2: guest list
  const [guestList, setGuestList] = useState(null);

  const [loading, setLoading] = useState(false); // shared loading flag
  const [error, setError] = useState(null);

  const reloadResponses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchJson("/.netlify/functions/analysisData");

      setResponses(json);
      return json;
    } catch (e) {
      setResponses(null);
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  

  const reloadGuestList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchJson("/.netlify/functions/allGuests");
      setGuestList(json);
      return json;
    } catch (e) {
      setGuestList(null);
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Convenience: load everything for the Admin page
  const reloadAllAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [guests, responses] = await Promise.all([
        fetchJson("/.netlify/functions/allGuests"),
        fetchJson("/.netlify/functions/analysisData"),
      ]);
    
      setGuestList(guests);
      setResponses(responses);

      return { guests, responses };
    } catch (e) {
      setError(e);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAdminData = useCallback(() => {
    setResponses(null);
    setGuestList(null);
    setError(null);
    setLoading(false);
  }, []);

  console.log("[AdminProvider] render", { responses, guestList, loading, error });

  return (
    <AdminContext.Provider
      value={{
        // data
        responses,
        guestList,

        // status
        loading,
        error,

        // reloaders
        reloadResponses,
        reloadGuestList,
        reloadAllAdminData,

        // setters if you want them
        setResponses,
        setGuestList,

        clearAdminData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminData() {
  const ctx = useContext(AdminContext);
  console.log("[Admin] ctx:", ctx);
  if (!ctx) throw new Error("useAdminData must be used inside AdminProvider");
  return ctx;
}