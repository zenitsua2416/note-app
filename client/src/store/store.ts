import { configureStore } from "@reduxjs/toolkit";

import { authReducer, noteStoreReducer, themeReducer } from "@/features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    noteStore: noteStoreReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
