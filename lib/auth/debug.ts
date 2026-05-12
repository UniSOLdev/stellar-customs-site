/** Set `STELLAR_AUTH_DEBUG=1` in `.env.local` for verbose auth logs (dev only recommended). */
export function authDebugEnabled() {
  return process.env.STELLAR_AUTH_DEBUG === "1" || process.env.STELLAR_AUTH_DEBUG === "true";
}

export function authDevLog(...args: unknown[]) {
  if (process.env.NODE_ENV !== "development") return;
  console.info("[stellarcustoms:auth]", ...args);
}

export function authDevVerbose(...args: unknown[]) {
  if (process.env.NODE_ENV !== "development" || !authDebugEnabled()) return;
  console.info("[stellarcustoms:auth:verbose]", ...args);
}
