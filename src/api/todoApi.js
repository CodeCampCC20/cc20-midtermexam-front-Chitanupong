
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com/api/V2",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const todoApi = {};

todoApi.createTask = (input) => {
  return apiClient.post("/todos", input);
};

todoApi.deleteTask = (TodoTaskId) => {
  return apiClient.delete(`/todos/${TodoTaskId}`);
};

todoApi.getAllTaskByUserID = () => {
  return apiClient.get("/todos");
};

todoApi.updateTask = (TodoTaskId, input) => {
  return apiClient.patch(`/todos/${TodoTaskId}`, input);
};

export default todoApi;
