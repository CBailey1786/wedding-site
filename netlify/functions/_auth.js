// netlify/functions/_auth.js

import jwt from "jsonwebtoken";

const SESSION_COOKIE_NAME = "wedding_session";
const SESSION_MAX_AGE_REMEMBER = 60 * 60 * 24 * 30; // 30 days
const SESSION_MAX_AGE = 60 * 60 * 24; // 1 day

const SECRET = process.env.JWT_SECRET || "dev-secret";

export function signSession(payload, remember) {
  const maxAge = remember ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE;

  return jwt.sign(payload, SECRET, {
    expiresIn: maxAge,
  });
}

export function makeCookie(token, remember) {
  const maxAge = remember ? SESSION_MAX_AGE_REMEMBER : SESSION_MAX_AGE;

  // Netlify sets URL / DEPLOY_URL env vars – if it's https, we can safely use Secure
  const isSecure = (process.env.URL || "").startsWith("https://");

  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAge}`,
  ];

  if (isSecure) {
    parts.push("Secure");
  }

  // 🔴 DO NOT set Domain=localhost or hard-code a domain.
  // Leaving out Domain makes it a host-only cookie, which works on both localhost and Netlify.

  return parts.join("; ");
}
