"use client";

import { useNotes, useAddNote } from "@/hooks/useNotes";
import { useState } from "react";

export default function Notes() {
  const { data = [] } = useNotes();
  const { mutate } = useAddNote();
  const [text, setText] = useState("");

  const addNewNote = () => {
    if (!text.trim()) return;

    mutate({
      id: crypto.randomUUID(),
      text,
      date: new Date().toISOString().split("T")[0],
    });

    setText("");
  };

  return (
    <section>
      <h2>Заметки</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите заметку"
      />

      <button onClick={addNewNote}>Добавить</button>

      <ul>
        {data.map((note) => (
          <li key={note.id}>
            <strong>{note.date}</strong>: {note.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
