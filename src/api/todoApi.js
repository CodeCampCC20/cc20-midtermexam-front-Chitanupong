import axios from 'axios';

const BASEURL = 'http://cc20-todo-midterm-env.eba-fi9p2pds.ap-southeast-1.elasticbeanstalk.com';
export const createTask = (taskName) => {
  const response = axios.post(`${BASEURL}/api/V2/todos`, { taskName });
  return response.data;

  // return axios.post(`${BASEURL}/api/V1/todos`, { text: taskName });
};

// เหลือ getTasks, deleteTask 