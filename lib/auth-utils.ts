// import { loginSuccess, loginError, registerSuccess, registerError } from "@/redux/slices/authSlice"
import { loginUser, registerUser } from "@/redux/slices/authSlice";

import { AppDispatch } from "@/redux/store";
import type { User } from "./types";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const handleLogin = (
  dispatch: AppDispatch,
  email: string,
  password: string,
) => {
  dispatch(loginUser({ email, password }));
};

export const handleRegister = (
  dispatch: AppDispatch,
  name: string,
  email: string,
  password: string,
) => {
  dispatch(registerUser({ name, email, password }));
};

export const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export const getStoredUser = (): User | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const clearAuthData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }
};
