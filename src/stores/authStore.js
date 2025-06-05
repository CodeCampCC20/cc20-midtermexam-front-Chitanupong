import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  username: null,
  setUsername: (name) => {
    set({ username: name });
  },
}));

export default useAuthStore;
