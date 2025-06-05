import React, { useState, useEffect } from 'react';
import useTaskStore from '../stores/taskStore';
import useAuthStore from '../stores/authStore';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import * as taskApi from '../api/todoApi';
import { schemaTask } from '../validator/schemaTask';
const userId = 6;

const initialInput = {
  taskName: "",
  userId: userId,
};

export default function TodoApp() {
  const token = useAuthStore((state) => state.token);
  const tasks = useTaskStore((state) => state.tasks);
  const actionFetchTask = useTaskStore((state) => state.actionFetchTask);

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

  useEffect(() => {
    if (token) {
      actionFetchTask(token);
    }
  }, [token]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value, userId }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };


  const handleAddTask = async () => {
    try {
      setIsLoading(true);
      const inputToValidate = { ...input, userId: Number(input.userId) };

      await schemaTask.validate(input, { abortEarly: false });
      await taskApi.createTask(input);
      await actionFetchTask(token);
      setInput(initialInput);

      toast.success("Add a new task success!");
    } catch (error) {
      toast.error("Task invalid!");
      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const deleteTask = async (taskId) => {
    try {
      setIsLoadingDel(true);
      await taskApi.deleteTask(taskId, token);
      await actionFetchTask(token);
      toast.success("Delete success!");
    } catch (error) {
      toast.error("Delete failed!");
    } finally {
      setIsLoadingDel(false);
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    const input = {
      taskName: task.taskName,
      completed: !task.completed,
    };

    try {
      await taskApi.updateTask(taskId, input, token);
      await actionFetchTask(token);
      toast.success("Update success!");
    } catch (error) {
      toast.error("Update failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-purple-900 flex items-center justify-center">
      <div className="bg-gray-900 text-white w-96 p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">My Todo</h1>
          <button
            onClick={handleAddTask}
            className="text-2xl hover:bg-gray-700 transition-colors bg-gray-800 rounded-xl p-1"
            title="Add Task"
          >
            🚀
          </button>
        </div>

        <input
          type="text"
          id="taskName"
          value={input.taskName}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTask();
            }
          }}
          placeholder="new task"
          className="w-full p-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded outline-none focus:ring-2 focus:ring-purple-500"
        />
        {inputError.taskName && (
          <p className="text-red-500 text-sm mb-2">{inputError.taskName}</p>
        )}

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="form-checkbox h-5 w-5 text-purple-500 bg-gray-800 border-gray-600"
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.taskName}
                </span>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-gray-500 hover:text-red-500"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}