import { UserProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserProfile = {
  id: 0,
  user_id: "",
  email: "",
};

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const selectUserProfile = (state: { userProfile: UserProfile }) =>
  state.userProfile;

export const { setUserProfile } = userProfileSlice.actions;
export const { reducer: userProfileReducer } = userProfileSlice;
