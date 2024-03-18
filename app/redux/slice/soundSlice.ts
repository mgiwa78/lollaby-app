import { createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

type SoundState = {
  currentSoud: number;
};

const initialState: SoundState = {
  currentSoud: 0,
};

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    setCurrentSound(state, action) {
      state.currentSoud = action.payload;
    },
  },
});

export const { setCurrentSound } = soundSlice.actions;
export default soundSlice.reducer;
