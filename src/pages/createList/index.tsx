import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNotes } from "@/context/NotesContext";

interface ListItem {
  id: string;
  text: string;
  checked: boolean;
}

const List = () => {
  const [title, setTitle] = useState("");
  const [listItems, setListItems] = useState<ListItem[]>([]);
  const [newItemText, setNewItemText] = useState("");

  const { deleteNote, addNote, updateNote } = useNotes();

  const handleAddItem = () => {
    if (newItemText.trim()) {
      setListItems([
        ...listItems,
        {
          id: Date.now().toString(),
          text: newItemText,
          checked: false,
        },
      ]);
      setNewItemText("");
    }
  };

  //   const handleToggleItem = (id: string) => {
  //     setListItems((prev) =>
  //       prev.map((item) =>
  //         item.id === id ? { ...item, checked: !item.checked } : item
  //       )
  //     );
  //   };

  const handleToggleItem = (e: any, itemId: string) => {
    e.preventDefault();
    console.log("Item ID:", itemId);
    console.log("List Items:", listItems);
    console.log("List Items:");
    // setListItems(
    //   listItems.map((item) =>
    //     item.id === itemId ? { ...item, checked: !item.checked } : item
    //   )

    // );
  };
  const handleCreateList = () => {
    if (title && listItems.length > 0) {
      addNote(title, {
        type: "list",
        items: listItems,
      });
      setTitle("");
      setListItems([]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full max-w-150 min-w-60 h-full p-2">
        <CardHeader>
          <CardTitle>
            <Textarea
              placeholder="List Title"
              className="h-12"
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {listItems.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e: any) => handleToggleItem(e, item.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Textarea
                placeholder="List Item"
                className="flex-1 h-8"
                value={item.text}
                onChange={(e: any) =>
                  setListItems((prev) =>
                    prev.map((i) =>
                      i.id === item.id ? { ...i, text: e.target.value } : i
                    )
                  )
                }
              />
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Textarea
              placeholder="Add new item..."
              className="flex-1 h-8"
              value={newItemText}
              onChange={(e: any) => setNewItemText(e.target.value)}
              onKeyDown={(e: any) => e.key === "Enter" && handleAddItem()}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddItem}
              disabled={!newItemText.trim()}
            >
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <Button
        onClick={handleCreateList}
        disabled={!title || listItems.length === 0}
      >
        Create List
      </Button>
    </div>
  );
};

export default List;
