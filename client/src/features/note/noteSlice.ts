import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Note, NoteStore, UUID } from "@/types";
import { buildNoteStoreFromArray, loadFromStorage } from "@/utils";

const initialState: NoteStore = loadFromStorage<NoteStore>("notes", {});

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNotes: (state, action: PayloadAction<Note[]>) => ({
      ...state,
      ...buildNoteStoreFromArray(action.payload),
    }),

    removeNote: (state, action: PayloadAction<UUID>) => {
      delete state[action.payload];
      return state;
    },

    updateNote: (state, action: PayloadAction<Note>) => {
      state[action.payload.id] = action.payload;
      return state;
    },
  },
});

export const selectNotes = (state: { notes: NoteStore }) => state.notes;

export const { addNotes, removeNote, updateNote } = noteSlice.actions;
export const { reducer: noteReducer } = noteSlice;
