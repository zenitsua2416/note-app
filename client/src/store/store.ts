import { configureStore } from "@reduxjs/toolkit";

import {
  authReducer,
  noteStoreReducer,
  themeReducer,
  userProfileReducer,
} from "@/features";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    noteStore: noteStoreReducer,
    theme: themeReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
