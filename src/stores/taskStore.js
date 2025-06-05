import todoApi from "../api/todoApi";
import { create } from "zustand";

const useTaskStore = create((set) => ({
  tasks: [],
  actionFetchTask: async () => {
    try {
      const res = await todoApi.getAllTaskByUserID();
      console.log("todoApi res:", res.data.todos);
      set({ tasks: res.data.todos });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useTaskStore;
