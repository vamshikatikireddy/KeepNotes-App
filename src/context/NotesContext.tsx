import React, { createContext, useContext, useState, useEffect } from "react";
import { getNoteId } from "../lib/getNoteId";

interface NotesContextType {
  notes: Array<{ id: string; title: string; content: string }>;
  addNote: (title: string, content: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<
    Array<{ id: string; title: string; content: string }>
  >([]);

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes);
        if (Array.isArray(parsedNotes)) {
          setNotes(parsedNotes);
        }
      } catch (error) {
        console.error("Error parsing notes:", error);
      }
    }
  }, []);

  const addNote = (title: string, content: string) => {
    const noteId = getNoteId({ title, content });
    const newNote = { id: noteId, title, content };

    // Update localStorage
    localStorage.setItem(noteId, JSON.stringify({ title, content }));
    const updatedNotes = [...notes, newNote];
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    // Update state
    setNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    // Remove individual note from localStorage
    localStorage.removeItem(id);
    // Update notes array
    const updatedNotes = notes.filter((note) => note.id !== id);
    // Update notes list in localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    if (updatedNotes.length === 0) {
      localStorage.removeItem("notes");
    }
    // Update state
    setNotes(updatedNotes);
  };

  const updateNote = (id: string, content: string) => {
    // Update individual note in localStorage
    localStorage.setItem(id, JSON.stringify({ content }));
    // Update notes array
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, content } : note
    );
    // Update notes list in localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    // Update state
    setNotes(updatedNotes);
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
