import { API_URL } from "@constants/Api";
import User from "../types/User";
import axios, { AxiosError } from "axios";
//import { API_URL } from "./config";

export const SignInService: any = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const SignUpService: any = async (userData: User) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signup`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
