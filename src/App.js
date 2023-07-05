import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Backlog from "./components/Backlog.js";
import Ready from "./components/Ready.js";
import InProgress from "./components/InProgress.js";
import Finished from "./components/Finished.js";
import TaskDetail from "./components/TaskDetail.js";

const App = () => {
  return (
    <Router>
      <div className="container">
        <header>
          <h1 className="board">Awesome Kanban Board</h1>
        </header>
        <div className="row-container">
          <div className="flex-item">
            <div className="column">
              <Backlog />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <Ready />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <InProgress />
            </div>
          </div>
          <div className="flex-item">
            <div className="column">
              <Finished />
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/tasks/:taskId" element={<TaskDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
