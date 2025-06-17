import { Note, NoteStore } from "@/types";

export const buildNoteStoreFromArray = (notes: Note[]): NoteStore => {
  const noteStore = notes.reduce((acc, note) => {
    acc[note.id] = note;
    return acc;
  }, {} as NoteStore);

  return noteStore;
};
