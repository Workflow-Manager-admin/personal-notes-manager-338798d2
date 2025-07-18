import React, { useState } from "react";

const FORM_CONTAINER = {
  background: "#fff",
  borderRadius: 12,
  padding: "2rem",
  boxShadow: "0 2px 12px 0 rgba(37,99,235,0.09)",
  width: "100%",
  maxWidth: 320,
  margin: "4rem auto"
};

const LABEL = {
  color: "#64748b",
  fontWeight: 600,
  marginBottom: 6,
  display: "block"
};
const INPUT = {
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: "1rem",
  padding: "0.8rem",
  width: "100%",
  marginBottom: 12
};

const BTN_LOGIN = {
  background: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 1.3rem",
  marginTop: 8,
  fontSize: "1rem",
  cursor: "pointer",
  marginBottom: "1rem"
};

const LINK = {
  color: "#fbbf24",
  cursor: "pointer",
  textDecoration: "underline",
  marginLeft: 4,
  fontWeight: 600,
  fontSize: "1rem"
};

/** PUBLIC_INTERFACE
 * Login form
 * Props: onLogin, switchToRegister, loading, error
 */
export default function LoginForm({ onLogin, switchToRegister, loading, error }) {
  const [form, setForm] = useState({ username: "", password: "" });
  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) return;
    onLogin(form.username, form.password);
  }

  return (
    <form style={FORM_CONTAINER} onSubmit={handleSubmit} aria-label="Login form">
      <h2 style={{ marginBottom: 20 }}>Login</h2>
      <div>
        <label style={LABEL} htmlFor="login-username">Username</label>
        <input
          id="login-username"
          name="username"
          type="text"
          value={form.username}
          onChange={handleChange}
          autoComplete="username"
          required
          style={INPUT}
        />
      </div>
      <div>
        <label style={LABEL} htmlFor="login-password">Password</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          required
          style={INPUT}
        />
      </div>
      {error && <div style={{ color: "#dc2626", marginBottom: 8 }}>{error.detail || error.msg || "Login failed"}</div>}
      <button type="submit" style={BTN_LOGIN} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <div>
        No account?
        <span style={LINK} tabIndex={0} onClick={switchToRegister}>Register</span>
      </div>
    </form>
  );
}
