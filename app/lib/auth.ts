// Authentication utilities for the frontend application
import { getApiBase } from './apiBase';
const API_BASE = getApiBase();

export interface LoginResponse {
  access_token: string;
  token_type: string;
  role: string;
  must_change_password?: boolean;
}

export interface User {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
}

// Login function
export async function login(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Incorrect email or password');
    }
    throw new Error('Network error - cannot reach API server');
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Login response not JSON');
  }

  const data = await response.json();
  
  // Store token in cookie
  if (data.access_token) {
    // Prefer Lax for normal navigation while protecting against CSRF in some cases.
    // Secure flag automatically ignored on http://localhost during dev.
    const secure = (typeof window !== 'undefined' && window.location.protocol === 'https:') ? 'Secure; ' : '';
    document.cookie = `auth_token=${encodeURIComponent(data.access_token)}; Path=/; Max-Age=${60*60*24*7}; ${secure}SameSite=Lax`;
    try { localStorage.setItem('user_token_role', data.role); } catch {/* ignore */}
  }

  return data;
}

// Logout function
export function logout(): void {
  // Clear auth cookie
  document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  // Clear any other stored auth data
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('recruiterIdentifier');
  }
}

// Get token from cookie
export function getTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/auth_token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

// Get auth headers for API requests
export function getAuthHeaders(): Record<string, string> {
  const token = getTokenFromCookie();
  if (!token) return { 'Content-Type': 'application/json' };
  
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return !!getTokenFromCookie();
}

// Get current user from token
export function getCurrentUser(): User | null {
  const token = getTokenFromCookie();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      is_active: payload.is_active,
    };
  } catch (error) {
    return null;
  }
}

// Check if user has specific role
export function hasRole(role: string): boolean {
  const user = getCurrentUser();
  return user?.role === role;
}