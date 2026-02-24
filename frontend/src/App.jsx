import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Editor from "./components/Editor";

const API = "http://localhost:5000/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Fetch Notes
  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setNotes(res.data);
    } catch {
      showNotification("Failed to fetch notes", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Save Note (Create or Update)
  const saveNote = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      showNotification("Title and content are required", "error");
      return;
    }

    try {
      setSaving(true);
      if (selectedNoteId) {
        // Update existing note
        await axios.put(`${API}/${selectedNoteId}`, note);
        showNotification("Note updated successfully");
      } else {
        // Create new note
        await axios.post(API, note);
        showNotification("Note created successfully");
      }
      setNote({ title: "", content: "" });
      setSelectedNoteId(null);
      fetchNotes();
    } catch {
      showNotification("Failed to save note", "error");
    } finally {
      setSaving(false);
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      showNotification("Note deleted successfully");
      setDeleteConfirmId(null);
      if (selectedNoteId === id) {
        setNote({ title: "", content: "" });
        setSelectedNoteId(null);
      }
      fetchNotes();
    } catch {
      showNotification("Failed to delete note", "error");
    }
  };

  // Select Note for Editing
  const selectNote = (selectedNote) => {
    setSelectedNoteId(selectedNote._id);
    setNote({ title: selectedNote.title, content: selectedNote.content });
    setDeleteConfirmId(null);
  };

  // Create New Note
  const createNewNote = () => {
    setSelectedNoteId(null);
    setNote({ title: "", content: "" });
    setDeleteConfirmId(null);
  };

  // Filter
  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Notification Toast */}
      {notification && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-xl shadow-2xl text-white z-50 animate-slideIn flex items-center gap-3 backdrop-blur-sm ${
            notification.type === "error"
              ? "bg-red-500/90 border border-red-400/50"
              : "bg-green-500/90 border border-green-400/50"
          }`}
        >
          <span className="text-lg">
            {notification.type === "error" ? "✕" : "✓"}
          </span>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-96 bg-white flex flex-col shadow-lg">
        {/* Logo & Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
              📝
            </div>
            <h1 className="text-2xl font-bold">Notes</h1>
          </div>
          <input
            className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* New Note Button */}
        <div className="p-4">
          <button
            onClick={createNewNote}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <span className="text-lg">+</span>
            New Note
          </button>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="animate-spin text-3xl mb-2">⟳</div>
                <p className="text-sm">Loading notes...</p>
              </div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-sm">No notes found</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {filteredNotes.map((n) => (
                <div
                  key={n._id}
                  className={`relative group p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedNoteId === n._id
                      ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                      : "bg-gray-50 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-100/50"
                  }`}
                  onClick={() => selectNote(n)}
                >
                  <h3 className="font-semibold text-gray-900 truncate text-sm">
                    {n.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5">
                    {formatDate(n.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm">
          <input
            className="w-full text-3xl font-bold text-gray-900 outline-none placeholder-gray-400 font-sans"
            placeholder="Note title"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Editor note={note} setNote={setNote} saveNote={saveNote} />
        </div>

        {/* Bottom Action Bar */}
        <div className="border-t border-gray-200 bg-white/80 backdrop-blur-sm p-6 flex justify-between items-center shadow-sm">
          <div className="text-sm text-gray-600 font-medium">
            {selectedNoteId ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Editing Mode
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Create New
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {selectedNoteId && (
              <div className="relative group">
                <button
                  onClick={() => setDeleteConfirmId(deleteConfirmId === selectedNoteId ? null : selectedNoteId)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 rounded-lg transition-all font-semibold text-sm border border-gray-200 hover:border-red-200"
                >
                  Delete
                </button>
                {deleteConfirmId === selectedNoteId && (
                  <div className="absolute right-0 top-12 bg-white border border-gray-200 rounded-lg shadow-lg p-3 whitespace-nowrap">
                    <p className="text-xs text-gray-700 mb-2">Confirm delete?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => deleteNote(selectedNoteId)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded font-semibold"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs rounded font-semibold"
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={saveNote}
              disabled={saving}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all font-semibold shadow-md hover:shadow-lg text-sm flex items-center gap-2"
            >
              {saving ? (
                <>
                  <span className="animate-spin">⟳</span>
                  Saving...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Save Note
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
