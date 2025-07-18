import React from "react";

const BAR_STYLES = {
  background: "#2563eb",
  color: "#fff",
  padding: "0.5rem 1.5rem",
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  justifyContent: "space-between"
};

const LOGOUT_BTN = {
  background: "#64748b",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "0.4rem 1rem",
  letterSpacing: 1,
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "1rem"
};

/**
 * PUBLIC_INTERFACE
 * TopBar - app title, user info, logout, theme toggle
 */
export default function TopBar({ username, onLogout, onThemeToggle, theme }) {
  return (
    <header style={BAR_STYLES}>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Notes App</div>
      <div>
        <span style={{ marginRight: 32 }}>
          Welcome, <strong>{username}</strong>
        </span>
        <button style={LOGOUT_BTN} onClick={onLogout} aria-label="Logout">Logout</button>
        <button
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          style={{
            marginLeft: 16,
            background: "#fbbf24",
            border: "none",
            borderRadius: 5,
            color: "#2563eb",
            fontWeight: 600,
            fontSize: "1rem",
            padding: "0.4rem 0.85rem",
            cursor: "pointer"
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
