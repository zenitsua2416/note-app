import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthSession } from "@/types";
import {
  getEnv,
  isValidSession,
  loadFromStorage,
  removeFromStorage,
} from "@/utils";

import { ExtendedAuthSession } from "./authSlice.types";

const AUTH_SESSION_STORAGE_KEY = `sb-${getEnv(
  "VITE_SUPABASE_PROJECT_REF",
)}-auth-token`;

const bareAuthSession: AuthSession = {
  user: {
    id: "",
    email: "",
    created_at: "",
    updated_at: "",
  },
  access_token: "",
  expires_at: 0,
  expires_in: 0,
  refresh_token: "",
  token_type: "",
};

const storedSession = loadFromStorage<AuthSession>(
  AUTH_SESSION_STORAGE_KEY,
  bareAuthSession,
);

const initialState: ExtendedAuthSession = {
  ...storedSession,
  isLoggedIn: isValidSession(storedSession),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      _state,
      action: PayloadAction<AuthSession>,
    ): ExtendedAuthSession => ({
      ...action.payload,
      isLoggedIn: isValidSession(action.payload),
    }),

    logout: (): ExtendedAuthSession => {
      removeFromStorage(AUTH_SESSION_STORAGE_KEY);

      return {
        ...bareAuthSession,
        isLoggedIn: false,
      };
    },
  },
});

export const selectAuthSession = (state: { auth: AuthSession }) => state.auth;
export const selectAuthUser = (state: { auth: AuthSession }) => state.auth.user;
export const selectIsLoggedIn = (state: { auth: ExtendedAuthSession }) =>
  state.auth.isLoggedIn;

export const { login, logout } = authSlice.actions;
export const { reducer: authReducer } = authSlice;
