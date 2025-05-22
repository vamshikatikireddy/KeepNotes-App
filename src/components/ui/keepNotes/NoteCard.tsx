import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { FiDelete } from "react-icons/fi";
import { useNotes } from "../../../context/NotesContext";
import { Button } from "../button";
import { PlusIcon } from "lucide-react";
import { Textarea } from "../textarea";

interface NoteCardProps {
  id: string;
  title: string;
  content: string | { type: string; items: any[] };
  type?: string;
}

function NoteCard({ id, title, content, type }: NoteCardProps) {
  const { deleteNote, updateNote } = useNotes();

  // // useEffect(() => {
  // //   updateNote(id, content || ""

  // //   );
  // }, [content]);
  // const handleUpdateNote = (noteId: string, updatedContent: any) => {
  //   updateNote(noteId, updatedContent);
  // };

  // const handleUpdateList = (noteId: string, updatedContent: any) => {
  //   updateNote(noteId, updatedContent);
  // };

  // const handleUpdateListItem = (noteId: string, updatedContent: any) => {
  //   updateNote(noteId, updatedContent);
  // };

  const handleToggleItem = (e: any, itemId: string) => {
    e.preventDefault();
    console.log("Item ID:", itemId);
    updateNote(id, {
      ...content,
      items: content.items.map((item: any) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    });
  };
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(id);
    }
  };
  const handleDeleteList = (noteId: string, itemId: string) => {
    updateNote(noteId, {
      ...content,
      items: content.items.filter((item: any) => item.id !== itemId),
    });
  };

  const handleAddItem = () => {
    updateNote(id, {
      ...content,
      items: [
        ...content.items,
        { id: Date.now().toString(), text: "", checked: false },
      ],
    });
  };

  const renderContent = () => {
    console.log("Note Content:", content, "Type:", typeof content);

    if (type === "list" && typeof content === "object" && "items" in content) {
      return (
        <ul className="space-y-2">
          {content.items.map((item: any) => (
            <li key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                readOnly
                className="rounded border-gray-300 text-blue-600"
                onChange={(e) => handleToggleItem(e, item.id)}
              />
              <Textarea
                className="text-sm text-gray-600 whitespace-pre-wrap break-words"
                value={item.text}
                onChange={(e) =>
                  updateNote(id, {
                    ...content,
                    items: content.items.map((i) =>
                      i.id === item.id ? { ...i, text: e.target.value } : i
                    ),
                  })
                }
              />
              <FiDelete
                className="text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => handleDeleteList(id, item.id)}
              />
            </li>
          ))}
          <Button variant="outline" size="sm" onClick={handleAddItem}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </ul>
      );
    }

    if (type === "audio" && typeof content === "object" && "src" in content) {
      return (
        <div className="flex items-center justify-center">
          <audio controls className="w-full">
            <source src={content.src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }

    if (type === "image" && typeof content === "object" && "src" in content) {
      return (
        <img
          src={content.src}
          alt={content.alt || "Note image"}
          className="w-full rounded"
        />
      );
    }

    if (
      type === "drawing" &&
      typeof content === "object" &&
      "dataUrl" in content
    ) {
      return (
        <img
          src={content.dataUrl}
          alt="Drawing"
          className="w-full border rounded"
        />
      );
    }

    // ✅ Fallback for plain string notes (like from localStorage)
    if (typeof content === "string") {
      return (
        <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">
          {content}
        </p>
      );
    }

    return (
      <p className="text-sm text-red-500">
        Unsupported note type or content format.
      </p>
    );
  };

  return (
    <Card
      key={id}
      className={`max-w-150 min-w-60 w-[20rem] min-h-1 p-2 gap-1 relative flex flex-col`}
    >
      <div className="absolute right-2 top-2 z-10">
        <FiDelete
          className="text-gray-400 hover:text-red-500 cursor-pointer"
          onClick={handleDelete}
        />
      </div>
      <div className="flex-1">
        <CardHeader className="p-2">
          <CardTitle className="p-0">
            <p className="text-lg font-semibold truncate">
              {title || "Untitled"}
            </p>
          </CardTitle>
        </CardHeader>
      </div>
      <CardContent className="p-2 py-0 h-full">
        <div className="flex-1">{renderContent()}</div>
      </CardContent>
    </Card>
  );
}

export default NoteCard;
