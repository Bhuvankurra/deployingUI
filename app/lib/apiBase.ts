// Central API base URL resolver.
// In production we expect NEXT_PUBLIC_API_URL to be defined (set in Vercel env).
// In local development, fallback to localhost if not provided.

export function getApiBase(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  // Dev fallback
  return 'http://localhost:8000';
}

export default getApiBase;