import React, { useState, useEffect } from "react";

const CONTAINER = {
  background: "#fff",
  padding: "2rem",
  borderRadius: 12,
  boxShadow: "0 2px 12px 0 rgba(37,99,235,0.07)",
  width: "100%",
  maxWidth: 600,
  margin: "2rem auto",
};

const LABEL = {
  color: "#64748b",
  fontWeight: 600,
  display: "block",
  marginBottom: 8
};

const INPUT = {
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: "1rem",
  padding: "0.8rem",
  width: "100%",
  marginBottom: 16
};
const TEXTAREA = {
  ...INPUT,
  minHeight: 160,
  resize: "vertical"
};

const ACTIONS = {
  display: "flex",
  gap: 10,
};

const BTN_PRIMARY = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontWeight: 600,
  padding: "0.7rem 1.6rem",
  fontSize: "1rem",
  cursor: "pointer",
};

const BTN_DELETE = {
  ...BTN_PRIMARY,
  background: "#fbbf24",
  color: "#1e293b",
};

/**
 * PUBLIC_INTERFACE
 * Note editor/viewer for creating/editing one note
 * - props: note, onSave, onDelete, loading, error, isEditing, isNew
 */
export default function NoteDetail({
  note,
  onSave,
  onDelete,
  loading,
  error,
  isEditing,
  isNew
}) {
  const [form, setForm] = useState({
    title: note?.title || "",
    content: note?.content || "",
  });

  useEffect(() => {
    setForm({
      title: note?.title || "",
      content: note?.content || "",
    });
  }, [note]);

  const handleChange = (evt) =>
    setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (form.title.trim() === "") return;
    onSave(form.title, form.content);
  }

  return (
    <form style={CONTAINER} onSubmit={handleSubmit} aria-label="Note editor">
      <div>
        <label style={LABEL} htmlFor="note-title">
          Title: <span style={{ color: "#fbbf24" }}>*</span>
        </label>
        <input
          id="note-title"
          name="title"
          type="text"
          required
          style={INPUT}
          value={form.title}
          onChange={handleChange}
          disabled={loading}
          placeholder="Enter a title..."
        />
      </div>
      <div>
        <label style={LABEL} htmlFor="note-content">
          Content:
        </label>
        <textarea
          id="note-content"
          name="content"
          style={TEXTAREA}
          value={form.content}
          onChange={handleChange}
          disabled={loading}
          placeholder="Write your note here..."
        />
      </div>
      {error && (
        <div style={{ color: "#dc2626", marginBottom: 10, fontWeight: "bold" }}>
          {error.msg || error.detail || "Something went wrong"}
        </div>
      )}
      <div style={ACTIONS}>
        <button
          style={BTN_PRIMARY}
          type="submit"
          disabled={loading || form.title.trim() === ""}
        >
          {isNew ? "Create" : (isEditing ? "Save" : "Update")}
        </button>
        {!isNew && (
          <button
            type="button"
            style={BTN_DELETE}
            onClick={onDelete}
            disabled={loading}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
