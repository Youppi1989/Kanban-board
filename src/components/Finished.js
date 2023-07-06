import React, { useState } from "react";
import { Link } from "react-router-dom";

const Finished = () => {
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);

  const dataMock = [
    {
      title: "ready",
      issues: [
        {
          id: "98765",
          name: "Main page – performance issues",
          description: "Fix performance issues on the main page",
        },
        {
          id: "98766",
          name: "Main page bugfix",
          description: "Fix the bug on the main page",
        },
      ],
    },
  ];

  const handleAddCard = () => {
    if (inProgressTasks.length === 0) {
      return;
    }
    const selectedTask = prompt(
      "Select a task from the in progress list:\n" +
        inProgressTasks.map((task) => task.name).join("\n")
    );

    if (selectedTask) {
      const task = inProgressTasks.find((task) => task.name === selectedTask);
      setFinishedTasks((prevTasks) => [...prevTasks, task]);
      setInProgressTasks((prevTasks) =>
        prevTasks.filter((task) => task.name !== selectedTask)
      );
    }
  };

  const handleDeleteCard = (taskId) => {
    setFinishedTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div>
      <h2>Finished</h2>
      {finishedTasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
          <button onClick={() => handleDeleteCard(task.id)}>Delete</button>
        </div>
      ))}
      {dataMock[0].issues.map((task) => (
        <div className="card" key={task.id}>
          <h3>
            <Link to={`/tasks/${task.id}`}>{task.name}</Link>
          </h3>
          <p>{task.description || "This task has no description"}</p>
        </div>
      ))}
      <button onClick={handleAddCard} disabled={inProgressTasks.length === 0}>
        + Add card
      </button>
    </div>
  );
};

export default Finished;
