// API base URL configuration

export function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
}

export default getApiBase;