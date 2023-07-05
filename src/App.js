import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Backlog from "./components/Backlog.js";
import Ready from "./components/Ready.js";
import InProgress from "./components/InProgress.js";
import Finished from "./components/Finished.js";
import TaskDetail from "./components/TaskDetail.js";

function App() {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [readyTasks, setReadyTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [finishedTaskCount, setFinishedTaskCount] = useState(0);

  const addNewTask = (list, taskTitle) => {
    if (taskTitle.trim() === "") return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle,
      description: "",
    };

    switch (list) {
      case "backlog":
        setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
        setActiveTaskCount((prevCount) => prevCount + 1);
        break;
      case "ready":
        setReadyTasks((prevTasks) => [...prevTasks, newTask]);
        setActiveTaskCount((prevCount) => prevCount + 1);
        setBacklogTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== newTask.id)
        );
        break;
      case "inProgress":
        setInProgressTasks((prevTasks) => [...prevTasks, newTask]);
        setActiveTaskCount((prevCount) => prevCount + 1);
        setReadyTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== newTask.id)
        );
        break;
      case "finished":
        setFinishedTasks((prevTasks) => [...prevTasks, newTask]);
        setFinishedTaskCount((prevCount) => prevCount + 1);
        setInProgressTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== newTask.id)
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const backlogTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("backlogTasks")) || [];
    const readyTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("readyTasks")) || [];
    const inProgressTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("inProgressTasks")) || [];
    const finishedTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("finishedTasks")) || [];

    if (backlogTasksFromLocalStorage.length > 0) {
      setBacklogTasks(backlogTasksFromLocalStorage);
    }
    if (readyTasksFromLocalStorage.length > 0) {
      setReadyTasks(readyTasksFromLocalStorage);
    }
    if (inProgressTasksFromLocalStorage.length > 0) {
      setInProgressTasks(inProgressTasksFromLocalStorage);
    }
    if (finishedTasksFromLocalStorage.length > 0) {
      setFinishedTasks(finishedTasksFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("backlogTasks", JSON.stringify(backlogTasks));
  }, [backlogTasks]);

  useEffect(() => {
    localStorage.setItem("readyTasks", JSON.stringify(readyTasks));
  }, [readyTasks]);

  useEffect(() => {
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
  }, [inProgressTasks]);

  useEffect(() => {
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
  }, [finishedTasks]);

  return (
    <Router>
      <div>
        <header>
          <h1 className="board">Awesome Kanban Board</h1>
        </header>

        <div className="container">
          <Backlog
            tasks={backlogTasks}
            addNewTask={(taskTitle) => addNewTask("backlog", taskTitle)}
          />

          <Ready
            tasks={readyTasks}
            addNewTask={(taskTitle) => addNewTask("ready", taskTitle)}
            moveTask={(taskId) => {
              const task = readyTasks.find((task) => task.id === taskId);
              if (task) {
                addNewTask("inProgress", task.title);
                setReadyTasks((prevTasks) =>
                  prevTasks.filter((task) => task.id !== taskId)
                );
              }
            }}
          />

          <InProgress
            tasks={inProgressTasks}
            addNewTask={(taskTitle) => addNewTask("inProgress", taskTitle)}
            moveTask={(taskId) => {
              const task = inProgressTasks.find((task) => task.id === taskId);
              if (task) {
                addNewTask("finished", task.title);
                setInProgressTasks((prevTasks) =>
                  prevTasks.filter((task) => task.id !== taskId)
                );
              }
            }}
          />

          <Finished
            tasks={finishedTasks}
            moveTask={(taskId) => {
              const task = finishedTasks.find((task) => task.id === taskId);
              if (task) {
                setFinishedTasks((prevTasks) =>
                  prevTasks.filter((task) => task.id !== taskId)
                );
                setFinishedTaskCount((prevCount) => prevCount - 1);
              }
            }}
          />

          <Routes>
            <Route
              path="/task/:taskId"
              element={
                <TaskDetail
                  tasks={[
                    ...backlogTasks,
                    ...readyTasks,
                    ...inProgressTasks,
                    ...finishedTasks,
                  ]}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
