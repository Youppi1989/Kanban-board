import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";
import Backlog from "./components/Backlog.js";
import Ready from "./components/Ready.js";
import InProgress from "./components/InProgress.js";
import Finished from "./components/Finished.js";
import TaskDetail from "./components/TaskDetail.js";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task, type) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, type }]);
  };

  const handleMoveTask = (taskId, target) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, type: target } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const activeTasksCount = tasks.filter(
    (task) => task.type === "ready" || task.type === "inProgress"
  ).length;
  const finishedTasksCount = tasks.filter(
    (task) => task.type === "finished"
  ).length;

  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <Router>
      <div className="container">
        <header>
          <h1 className="board">
            Awesome Kanban Board
            <img
              src="./assets/user-avatar.png"
              alt="User Avatar"
              className="user-avatar"
              onClick={toggleMenu}
            />
            {isMenuOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/logout">Log out</Link>
                </li>
              </ul>
            )}
            <img
              src="./assets/arrow-icon.png"
              alt="Arrow Icon"
              className={`arrow-icon ${isMenuOpen ? "up" : "down"}`}
              onClick={toggleMenu}
            />
          </h1>
        </header>
        <div className="row-container">
          <div className="flex-item">
            <div className="column">
              <Backlog
                tasks={tasks.filter((task) => task.type === "backlog")}
                onAddTask={handleAddTask}
              />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <Ready
                tasks={tasks.filter((task) => task.type === "ready")}
                onAddTask={handleAddTask}
                onMoveTask={handleMoveTask}
              />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <InProgress
                tasks={tasks.filter((task) => task.type === "inProgress")}
                onAddTask={handleAddTask}
                onMoveTask={handleMoveTask}
              />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <Finished
                tasks={tasks.filter((task) => task.type === "finished")}
                onAddTask={handleAddTask}
                onMoveTask={handleMoveTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </div>
        </div>
        <Route
          path="/tasks/:taskId"
          render={(props) => <TaskDetail tasks={tasks} {...props} />}
        />
        <footer>
          <p>
            Active tasks: {activeTasksCount} | Finished tasks:{" "}
            {finishedTasksCount}
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
