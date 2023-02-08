import { createSlice } from "@reduxjs/toolkit";
import { z } from "zod";
import type { PayloadAction } from "@reduxjs/toolkit";

export const zodUserState = z.object({
  userid: z.number().gt(0),
  email: z.string().email(),
  name: z.string(),
  image: z.string().url(),
  token: z.string(),
});
export type UserState = z.infer<typeof zodUserState>;

export const userSlice = createSlice({
  name: "user",
  initialState: null as UserState | null,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    deleteUser: (state) => {
      return null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export const userSliceReducer = userSlice.reducer;
