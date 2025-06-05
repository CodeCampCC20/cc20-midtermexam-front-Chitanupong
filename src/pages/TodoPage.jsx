import React, { useState } from 'react';
import { createTask } from '../api/todoApi'; 
export default function TodoApp() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Learn javascript', done: false },
    { id: 3, text: 'Learn css', done: false },
  ]);
  const [newTask, setNewTask] = useState('');


  const handleAddTask =  () => {
  if (!newTask.trim()) return;

  try {
    const createdTask = createTask(newTask);
    setTasks([...tasks, { ...createdTask, done: false }]);
    setNewTask('');
  } catch (error) {
    console.error(error);
  }
};

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddTask();
            }
          }}
          placeholder="new task"
          className="w-full p-2 mb-4 bg-gray-800 text-white placeholder-gray-400 rounded outline-none focus:ring-2 focus:ring-purple-500"
        />

        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  className="form-checkbox h-5 w-5 text-purple-500 bg-gray-800 border-gray-600"
                />
                <span className={task.done ? 'line-through text-gray-500' : ''}>
                  {task.text}
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