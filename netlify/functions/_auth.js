import jwt from "jsonwebtoken";

export const COOKIE_NAME = "w_session";

const ONE_HOUR_SECONDS = 60 * 60;
const REMEMBER_ME_SECONDS = 60 * 60 * 24 * 365; // 5 seconds

function getMaxAgeSeconds(rememberMe) {
  return rememberMe ? REMEMBER_ME_SECONDS : ONE_HOUR_SECONDS;
}

export function signSession(payload, rememberMe = false) {
  const maxAge = getMaxAgeSeconds(rememberMe);
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
}

export function parseSessionFromCookie(cookieHeader) {
  const cookie = cookieHeader || "";
  const parts = cookie.split(";").map((c) => c.trim());
  const pair = parts.find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!pair) return null;

  const token = pair.substring(COOKIE_NAME.length + 1);
  if (!token) return null;

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export function makeCookie(token, rememberMe = false) {

  const maxAge = getMaxAgeSeconds(rememberMe);

  const attrs = [
    `${COOKIE_NAME}=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    process.env.NETLIFY_DEV ? "" : "Secure",
    `Max-Age=${maxAge}`,
  ].filter(Boolean);

  return attrs.join("; ");
}
