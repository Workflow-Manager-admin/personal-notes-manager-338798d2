import config from "./config";
import { setToken, clearToken, getToken, authFetch } from "./auth";

/**
 * PUBLIC_INTERFACE
 * Register user
 */
export async function register(username, password) {
  const res = await fetch(`${config.API_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    throw await res.json();
  }
  return await res.json();
}

/**
 * PUBLIC_INTERFACE
 * Login user and get JWT token
 */
export async function login(username, password) {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  const res = await fetch(`${config.API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  if (!res.ok) {
    throw await res.json();
  }
  const data = await res.json();
  setToken(data.access_token);
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Logout user
 */
export function logout() {
  clearToken();
}

/**
 * PUBLIC_INTERFACE
 * Get all notes for user (authenticated)
 */
export async function fetchNotes() {
  const res = await authFetch(`${config.API_URL}/api/notes`);
  if (!res.ok) throw await res.json();
  return await res.json();
}

/**
 * PUBLIC_INTERFACE
 * Create note
 */
export async function createNote({ title, content }) {
  const res = await authFetch(`${config.API_URL}/api/notes`, {
    method: "POST",
    body: JSON.stringify({ title, content })
  });
  if (!res.ok) throw await res.json();
  return await res.json();
}

/**
 * PUBLIC_INTERFACE
 * Update note
 */
export async function updateNote(noteId, { title, content }) {
  const res = await authFetch(`${config.API_URL}/api/notes/${noteId}`, {
    method: "PUT",
    body: JSON.stringify({ title, content })
  });
  if (!res.ok) throw await res.json();
  return await res.json();
}

/**
 * PUBLIC_INTERFACE
 * Delete note
 */
export async function deleteNote(noteId) {
  const res = await authFetch(`${config.API_URL}/api/notes/${noteId}`, {
    method: "DELETE"
  });
  if (!res.ok && res.status !== 204) throw await res.json();
  return true;
}
