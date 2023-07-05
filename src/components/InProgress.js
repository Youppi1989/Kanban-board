import React, { useState } from "react";

const InProgress = () => {
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [readyTasks, setReadyTasks] = useState([]);

  const dataMock = [
    {
      title: "inProgress",
      issues: [
        {
          id: "67892",
          name: "User page – performance issues",
          description: "Fix performance issues on the user page",
        },
        {
          id: "67893",
          name: "Auth bugfix",
          description: "Fix the bug in the authentication process",
        },
      ],
    },
  ];

  const handleAddCard = () => {
    if (readyTasks.length === 0) {
      return;
    }

    const selectedTask = prompt(
      "Select a task from the ready list:\n" +
        readyTasks.map((task) => task.name).join("\n")
    );

    if (selectedTask) {
      const task = readyTasks.find((task) => task.name === selectedTask);
      setInProgressTasks((prevTasks) => [...prevTasks, task]);
      setReadyTasks((prevTasks) =>
        prevTasks.filter((task) => task.name !== selectedTask)
      );
    }
  };

  const handleDeleteCard = (taskId) => {
    setInProgressTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div>
      <h2>In Progress</h2>
      {inProgressTasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
          <button onClick={() => handleDeleteCard(task.id)}>Delete</button>
        </div>
      ))}
      {dataMock[0].issues.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
        </div>
      ))}
      <button onClick={handleAddCard} disabled={readyTasks.length === 0}>
        + Add card
      </button>
    </div>
  );
};

export default InProgress;
