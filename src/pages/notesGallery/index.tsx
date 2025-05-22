import React from "react";
import NoteCard from "../../components/ui/keepNotes/NoteCard";
import { useNotes } from "@/context/NotesContext";
import { chipClasses } from "@mui/material";

function NotesGallery() {
  const { notes } = useNotes();

  const getSizeClass = (content: any): string => {
    // Handle different types of content
    let length = 0;
    if (typeof content === "string") {
      length = content.trim().split("\n").length;
    } else if (Array.isArray(content)) {
      // For list type notes
      length = content.length;
    } else if (content?.type === "audio") {
      // For audio notes
      length = 3; // Fixed size for audio notes
    }

    if (length <= 3) return "note-small";
    if (length <= 6) return "note-medium";
    return "note-large";
  };

  const CustomDiv = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="grid grid-cols-1 items-start xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    );
  };

  return (
    <CustomDiv>
      {notes.map((note: any) => (
        <NoteCard
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content}
          minHeight={getSizeClass(note.content)}
          type={
            note.type ||
            (typeof note.content === "object" && "type" in note.content
              ? note.content.type
              : "text")
          } // Pass the type to NoteCard
        />
      ))}
    </CustomDiv>
  );
}

export default NotesGallery;
