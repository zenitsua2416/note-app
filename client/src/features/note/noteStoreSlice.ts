import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { STORAGE } from "@/constants";
import { Note, NoteStore, UUID } from "@/types";
import { buildNoteStoreFromArray, loadFromStorage } from "@/utils";

const initialState: NoteStore = loadFromStorage<NoteStore>(
  STORAGE.NOTE_STORE,
  {},
);

export const noteStoreSlice = createSlice({
  name: "noteStore",
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

export const selectNoteStore = (state: { noteStore: NoteStore }) =>
  state.noteStore;

export const { addNotes, removeNote, updateNote } = noteStoreSlice.actions;
export const { reducer: noteStoreReducer } = noteStoreSlice;
