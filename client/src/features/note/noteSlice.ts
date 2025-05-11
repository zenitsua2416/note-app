import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Note, UUID } from "@/types";
import { loadFromStorage } from "@/utils";

const initialState: Note[] = loadFromStorage<Note[]>("notes", []);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action: PayloadAction<Note[]>) =>
      Array.from(
        new Map(
          [...state, ...action.payload].map((note) => [note.id, note]),
        ).values(),
      ),

    removeNote: (state, action: PayloadAction<UUID>) =>
      state.filter((note) => note.id !== action.payload),

    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.findIndex((note) => note.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

export const selectNotes = (state: { notes: Note[] }) => state.notes;

export const { addNotes, removeNote, updateNote } = noteSlice.actions;
export const { reducer: noteReducer } = noteSlice;
