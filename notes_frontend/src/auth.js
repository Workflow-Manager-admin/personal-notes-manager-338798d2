const TOKEN_KEY = "notes_jwt_token";

// PUBLIC_INTERFACE
export function setToken(token) {
  /** Stores JWT token in local storage. */
  localStorage.setItem(TOKEN_KEY, token);
}

// PUBLIC_INTERFACE
export function getToken() {
  /** Retrieves JWT token from local storage. */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Clears the JWT token from local storage. */
  localStorage.removeItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Returns true if a JWT token is present. */
  return !!getToken();
}

// PUBLIC_INTERFACE
export async function authFetch(url, options = {}) {
  /** Fetch with Authorization header if token is present. */
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
}
