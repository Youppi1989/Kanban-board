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
      id: Date.now(),
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
        break;
      case "inProgress":
        setInProgressTasks((prevTasks) => [...prevTasks, newTask]);
        setActiveTaskCount((prevCount) => prevCount + 1);
        break;
      case "finished":
        setFinishedTasks((prevTasks) => [...prevTasks, newTask]);
        setFinishedTaskCount((prevCount) => prevCount + 1);
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

  return (
    <Router>
      <div>
        <header>
          <h1 className="board">Awesome Kanban Board</h1>
        </header>

        <div className="container">
          <Backlog
            tasks={backlogTasks}
            addNewTask={addNewTask}
            linkComponent={Link}
          />

          <Ready
            backlogTasks={backlogTasks}
            readyTasks={readyTasks}
            setReadyTasks={setReadyTasks}
            addNewTask={addNewTask}
            linkComponent={Link}
          />

          <InProgress
            readyTasks={readyTasks}
            inProgressTasks={inProgressTasks}
            setInProgressTasks={setInProgressTasks}
            addNewTask={addNewTask}
            linkComponent={Link}
          />

          <Finished
            inProgressTasks={inProgressTasks}
            finishedTasks={finishedTasks}
            setFinishedTasks={setFinishedTasks}
            addNewTask={addNewTask}
            linkComponent={Link}
          />
        </div>

        <Routes>
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

        <footer>
          Active tasks: {activeTaskCount} Finished tasks: {finishedTaskCount}
        </footer>
      </div>
    </Router>
  );
}

export default App;
