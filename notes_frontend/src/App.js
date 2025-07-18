import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import NoteDetail from "./components/NoteDetail";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {
  register,
  login,
  logout,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./api";
import { isAuthenticated, getToken, clearToken } from "./auth";

function parseJwt(token) {
  /** Decode simple JWT for username display. */
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    return JSON.parse(atob(payload));
  } catch (err) {
    return null;
  }
}

// PUBLIC_INTERFACE
function App() {
  // UI theme
  const [theme, setTheme] = useState("light");
  // Auth/session and view
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [mode, setMode] = useState("login"); // login | register | main
  // App data
  const [username, setUsername] = useState("");
  const [notes, setNotes] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [noteError, setNoteError] = useState(null);

  // Theme application
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Extract username from JWT when login state changes
  useEffect(() => {
    if (!loggedIn) {
      setUsername("");
      return;
    }
    const token = getToken();
    const data = parseJwt(token);
    setUsername((data && (data.username || data.sub)) || "User");
  }, [loggedIn]);

  // Load notes when authenticated
  useEffect(() => {
    if (!loggedIn) return;
    setLoading(true);
    fetchNotes()
      .then(data => {
        setNotes(data);
        setActiveNoteId(data.length > 0 ? data[0].id : null);
      })
      .catch(() => {
        setNotes([]);
      })
      .finally(() => setLoading(false));
  }, [loggedIn]);

  // Login & Registration handlers
  const handleLogin = (username, password) => {
    setLoading(true);
    setAuthError(null);
    login(username, password)
      .then(() => {
        setLoggedIn(true);
        setMode("main");
      })
      .catch(e => setAuthError(e))
      .finally(() => setLoading(false));
  };

  const handleRegister = (username, password) => {
    setLoading(true);
    setAuthError(null);
    register(username, password)
      .then(() => {
        // Auto-login after registration
        return login(username, password);
      })
      .then(() => {
        setLoggedIn(true);
        setMode("main");
      })
      .catch(e => setAuthError(e))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    clearToken();
    setMode("login");
    setNotes(null);
    setActiveNoteId(null);
    setEditing(false);
    setAuthError(null);
    setNoteError(null);
  };

  // Note CRUD handlers
  function handleSelectNote(id) {
    setActiveNoteId(id);
    setEditing(false);
    setNoteError(null);
  }

  function handleNewNote() {
    setActiveNoteId("new");
    setEditing(true);
    setNoteError(null);
  }

  function handleSaveNote(title, content) {
    setLoading(true);
    setNoteError(null);

    if (activeNoteId === "new") {
      // Create
      createNote({ title, content })
        .then(note => {
          setNotes([note, ...(notes || [])]);
          setActiveNoteId(note.id);
          setEditing(false);
        })
        .catch(e => setNoteError(e))
        .finally(() => setLoading(false));
    } else {
      // Update
      updateNote(activeNoteId, { title, content })
        .then(note => {
          setNotes(notes.map(n => (n.id === note.id ? note : n)));
          setEditing(false);
        })
        .catch(e => setNoteError(e))
        .finally(() => setLoading(false));
    }
  }

  function handleEditNote() {
    setEditing(true);
    setNoteError(null);
  }

  function handleDeleteNote() {
    if (activeNoteId === "new") return;
    setLoading(true);
    setNoteError(null);
    deleteNote(activeNoteId)
      .then(() => {
        setNotes(notes.filter(n => n.id !== activeNoteId));
        // Move to first note, or to new note
        setActiveNoteId(
          notes.length > 1 ? notes.filter(n => n.id !== activeNoteId)[0]?.id : null
        );
        setEditing(false);
      })
      .catch(e => setNoteError(e))
      .finally(() => setLoading(false));
  }

  function handleThemeToggle() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // Main content logic
  if (!loggedIn) {
    return mode === "login" ? (
      <LoginForm
        onLogin={handleLogin}
        switchToRegister={() => {
          setMode("register");
          setAuthError(null);
        }}
        loading={loading}
        error={authError}
      />
    ) : (
      <RegisterForm
        onRegister={handleRegister}
        switchToLogin={() => {
          setMode("login");
          setAuthError(null);
        }}
        loading={loading}
        error={authError}
      />
    );
  }

  // Main app view
  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: theme === "dark" ? "#181928" : "#f8fafc"
    }}>
      <Sidebar
        notes={notes || []}
        activeNoteId={activeNoteId}
        onSelectNote={handleSelectNote}
        onAddNote={handleNewNote}
        loading={loading && (!notes || notes.length === 0)}
      />
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        <TopBar
          username={username}
          onLogout={handleLogout}
          onThemeToggle={handleThemeToggle}
          theme={theme}
        />
        <div style={{ flex: 1, padding: "0 2vw", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          {activeNoteId === "new" ? (
            <NoteDetail
              note={{ title: "", content: "" }}
              onSave={handleSaveNote}
              onDelete={handleDeleteNote}
              loading={loading}
              error={noteError}
              isEditing={true}
              isNew={true}
            />
          ) : activeNoteId ? (
            <NoteDetail
              note={notes?.find(n => n.id === activeNoteId)}
              onSave={handleSaveNote}
              onDelete={handleDeleteNote}
              loading={loading}
              error={noteError}
              isEditing={editing}
              isNew={false}
            />
          ) : (
            <div style={{ margin: "4rem auto", color: "#64748b", fontSize: "1.2rem" }}>
              Select or create a note to begin.
            </div>
          )}
        </div>
        {activeNoteId && !editing && (
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <button
              style={{
                background: "#64748b",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                fontWeight: 600,
                padding: "0.6rem 1.6rem",
                fontSize: "1rem",
                cursor: "pointer",
              }}
              onClick={handleEditNote}
            >
              Edit Note
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
