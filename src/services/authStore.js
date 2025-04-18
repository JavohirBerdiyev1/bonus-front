// authStore.js
import {create} from "zustand";

const useAuthStore = create((set) => ({
  login: "",
  password: "",
  setCredentials: (login, password) => set({ login, password }),
}));

export default useAuthStore;
