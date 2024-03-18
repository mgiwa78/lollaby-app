import { RootState } from "../store.js";

export const selectSound = (state: RootState) => state.sound;

export const selectCurrent = (state: RootState) =>
  selectSound(state).currentSoud;
