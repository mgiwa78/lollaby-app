import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "./store.js";

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
