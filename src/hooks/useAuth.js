import { useEffect, useState } from "react";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState(null);

  useEffect(() => {
    async function check() {
      const res = await fetch("/.netlify/functions/me");

      if (res.ok) {
        const json = await res.json();
        setParty(json);
      }

      setLoading(false);
    }

    check();
  }, []);

  return { loading, party, isLoggedIn: !!party };
}
