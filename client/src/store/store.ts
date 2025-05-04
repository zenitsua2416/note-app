import { configureStore } from "@reduxjs/toolkit";

import { authReducer, themeReducer } from "@/features";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
