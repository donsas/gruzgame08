/**
 * Public site URL for Farcaster manifest and auth.
 * On Vercel: set NEXT_PUBLIC_URL in production, or rely on VERCEL_* auto-injection.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_URL) {
    return process.env.NEXT_PUBLIC_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export function getSiteHost(): string {
  return new URL(getSiteUrl()).host;
}
