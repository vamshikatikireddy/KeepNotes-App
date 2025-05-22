import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useNotes } from "../../context/NotesContext";

function CreateNotes() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { addNote } = useNotes();

  const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && content) {
      addNote(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleCreateNote}>
      <Card className="grid grid-rows-[auto_1fr] w-full max-w-150 min-w-60 h-full p-2 gap-1">
        <CardHeader className="">
          <CardTitle>
            <Input
              type="text"
              placeholder="Title"
              className="rounded-t-2xl max-w-145 min-w-60 rounded-b-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 h-full">
          <div className="flex-1">
            <Textarea
              placeholder="Note"
              className="h-full max-w-145 min-w-60 rounded-b-2xl rounded-t-none text-sm text-gray-600 whitespace-pre-wrap break-words"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      <Button
        type="submit"
        className="hover:opacity-75 hover:cursor-pointer"
        disabled={!title || !content}
      >
        Create Note
      </Button>
    </form>
  );
}

export default CreateNotes;
