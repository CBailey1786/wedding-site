import { COOKIE_NAME } from "./_auth.js"; // export COOKIE_NAME so we can reuse it

export const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Set-Cookie": `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0; ${
        process.env.NETLIFY_DEV ? "" : "Secure"
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ok: true }),
  };
};