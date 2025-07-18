import React from "react";

const SIDEBAR_STYLES = {
  background: "var(--sidebar-bg, #2563eb)",
  color: "var(--sidebar-text, #fff)",
  width: 240,
  minHeight: "100vh",
  padding: "2rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #dbeafe",
};

const NOTE_ITEM_STYLES = isActive => ({
  padding: "0.75rem 0.5rem",
  borderRadius: "0.5rem",
  marginBottom: 6,
  cursor: "pointer",
  background: isActive ? "var(--accent, #fbbf24)" : "transparent",
  color: isActive ? "#2563eb" : "inherit",
  fontWeight: isActive ? "bold" : 500,
  border: isActive ? "none" : "1px solid transparent",
  transition: "background 0.2s"
});

const NEW_NOTE_BTN = {
  background: "var(--accent, #fbbf24)",
  color: "#2563eb",
  fontWeight: 600,
  border: "none",
  borderRadius: "0.5rem",
  margin: "0.5rem 0 1rem 0",
  padding: "0.7rem",
  cursor: "pointer",
  fontSize: "1rem"
};

/**
 * PUBLIC_INTERFACE
 * Sidebar - note list and navigation
 */
export default function Sidebar({ notes, activeNoteId, onSelectNote, onAddNote, loading }) {
  return (
    <aside style={SIDEBAR_STYLES}>
      <h2 style={{marginBottom: 20, fontSize: "1.33rem"}}>Your Notes</h2>
      <button style={NEW_NOTE_BTN} onClick={onAddNote} disabled={loading}>+ New Note</button>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {loading && <p>Loading...</p>}
        {notes && notes.length === 0 && !loading && <p>No notes yet.</p>}
        {notes && notes.map(note => (
          <div
            key={note.id}
            style={NOTE_ITEM_STYLES(note.id === activeNoteId)}
            onClick={() => onSelectNote(note.id)}
            tabIndex={0}
            aria-label={`View note titled ${note.title}`}
          >
            <span>{note.title}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
