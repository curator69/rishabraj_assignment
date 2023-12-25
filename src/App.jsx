// App.js
import React, { useState, useEffect } from "react";
import TaskForm from "./Taskform";
import TaskList from "./TaskList";
import FilterButtons from "./FIlterButtons";
import "./App.css"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

   useEffect(() => {
     const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
     if (storedTasks.length > 0) {
       setTasks(storedTasks);
     }
   }, []);

   useEffect(() => {
     localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);

  const addTask = (title, description) => {
    if (title.trim() !== "") {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const filterTasks = (filterType) => {
    setFilter(filterType);
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "active":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="app">
      <h1>Task Management App</h1>
      <TaskForm addTask={addTask} />
      <FilterButtons filterTasks={filterTasks} />
      <TaskList
        tasks={getFilteredTasks()}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default App;
