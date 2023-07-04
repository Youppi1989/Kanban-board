import "./App.css";
import "./index.css";
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

  useEffect(() => {
    const backlogTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("backlogTasks")) || [];
    const readyTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("readyTasks")) || [];
    const inProgressTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("inProgressTasks")) || [];
    const finishedTasksFromLocalStorage =
      JSON.parse(localStorage.getItem("finishedTasks")) || [];

    setBacklogTasks(backlogTasksFromLocalStorage);
    setReadyTasks(readyTasksFromLocalStorage);
    setInProgressTasks(inProgressTasksFromLocalStorage);
    setFinishedTasks(finishedTasksFromLocalStorage);
  }, []);

  useEffect(() => {
    localStorage.setItem("backlogTasks", JSON.stringify(backlogTasks));
    localStorage.setItem("readyTasks", JSON.stringify(readyTasks));
    localStorage.setItem("inProgressTasks", JSON.stringify(inProgressTasks));
    localStorage.setItem("finishedTasks", JSON.stringify(finishedTasks));
  }, [backlogTasks, readyTasks, inProgressTasks, finishedTasks]);

  const addNewTask = (list, taskTitle) => {
    if (taskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: "",
    };

    switch (list) {
      case "backlog":
        setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      case "ready":
        setReadyTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      case "inProgress":
        setInProgressTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      case "finished":
        setFinishedTasks((prevTasks) => [...prevTasks, newTask]);
        break;
      default:
        break;
    }
  };

  return (
    <Router>
      <div>
        <h1>Kanban Board</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Backlog</Link>
            </li>
            <li>
              <Link to="/ready">Ready</Link>
            </li>
            <li>
              <Link to="/inProgress">In Progress</Link>
            </li>
            <li>
              <Link to="/finished">Finished</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Backlog tasks={backlogTasks} addNewTask={addNewTask} />}
          />
          <Route
            path="/ready"
            element={
              <Ready
                backlogTasks={backlogTasks}
                readyTasks={readyTasks}
                setReadyTasks={setReadyTasks}
                addNewTask={addNewTask}
              />
            }
          />
          <Route
            path="/inProgress"
            element={
              <InProgress
                readyTasks={readyTasks}
                inProgressTasks={inProgressTasks}
                setInProgressTasks={setInProgressTasks}
                addNewTask={addNewTask}
              />
            }
          />
          <Route
            path="/finished"
            element={
              <Finished
                inProgressTasks={inProgressTasks}
                finishedTasks={finishedTasks}
                setFinishedTasks={setFinishedTasks}
                addNewTask={addNewTask}
              />
            }
          />
          <Route
            path="/tasks/:taskId"
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
    </Router>
  );
}

export default App;
