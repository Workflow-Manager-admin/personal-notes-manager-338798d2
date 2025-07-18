import React, { useState } from "react";

const FORM_CONTAINER = {
  background: "#fff",
  borderRadius: 12,
  padding: "2rem",
  boxShadow: "0 2px 12px 0 rgba(251,191,36,0.07)",
  width: "100%",
  maxWidth: 330,
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

const BTN_REG = {
  background: "#fbbf24",
  color: "#2563eb",
  fontWeight: 700,
  border: "none",
  borderRadius: 8,
  padding: "0.7rem 1.3rem",
  marginTop: 8,
  fontSize: "1rem",
  cursor: "pointer"
};

const LINK = {
  color: "#2563eb",
  cursor: "pointer",
  textDecoration: "underline",
  marginLeft: 4,
  fontWeight: 600,
  fontSize: "1rem"
};

/** PUBLIC_INTERFACE
 * Registration form
 * Props: onRegister, switchToLogin, loading, error
 */
export default function RegisterForm({ onRegister, switchToLogin, loading, error }) {
  const [form, setForm] = useState({ username: "", password: "" });
  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username.trim() || !form.password.trim()) return;
    onRegister(form.username, form.password);
  }

  return (
    <form style={FORM_CONTAINER} onSubmit={handleSubmit} aria-label="Register form">
      <h2 style={{ marginBottom: 20 }}>Register</h2>
      <div>
        <label style={LABEL} htmlFor="register-username">Username</label>
        <input
          id="register-username"
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
        <label style={LABEL} htmlFor="register-password">Password</label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
          style={INPUT}
        />
      </div>
      {error && <div style={{ color: "#dc2626", marginBottom: 8 }}>{error.detail || error.msg || "Registration failed"}</div>}
      <button type="submit" style={BTN_REG} disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <div>
        Already registered?
        <span style={LINK} tabIndex={0} onClick={switchToLogin}>Login</span>
      </div>
    </form>
  );
}
