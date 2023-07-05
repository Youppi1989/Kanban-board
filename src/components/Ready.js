// Ready.js
import React, { useState } from "react";

const Ready = () => {
  const [readyTasks, setReadyTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);

  const dataMock = [
    {
      title: "ready",
      issues: [
        {
          id: "67890",
          name: "Shop page – performance issues",
          description: "Fix performance issues on the shop page",
        },
        {
          id: "09876",
          name: "Checkout bugfix",
          description: "Fix the bug in the checkout process",
        },
        {
          id: "54321",
          name: "Shop bug1",
          description: "Fix shop bug 1",
        },
        {
          id: "12345",
          name: "Shop bug2",
          description: "Fix shop bug 2",
        },
        {
          id: "13579",
          name: "Shop bug3",
          description: "Fix shop bug 3",
        },
        {
          id: "24680",
          name: "Shop bug4",
          description: "Fix shop bug 4",
        },
        {
          id: "86420",
          name: "Shop bug5",
          description: "Fix shop bug 5",
        },
        {
          id: "13579",
          name: "Shop bug6",
          description: "Fix shop bug 6",
        },
        {
          id: "67891",
          name: "Shop page – performance issues",
          description: "Fix performance issues on the shop page",
        },
      ],
    },
  ];

  const handleAddCard = () => {
    if (backlogTasks.length === 0) {
      return;
    }

    const selectedTask = prompt(
      "Select a task from the backlog:\n" +
        backlogTasks.map((task) => task.name).join("\n")
    );

    if (selectedTask) {
      const task = backlogTasks.find((task) => task.name === selectedTask);
      setReadyTasks((prevTasks) => [...prevTasks, task]);
      setBacklogTasks((prevTasks) =>
        prevTasks.filter((task) => task.name !== selectedTask)
      );
    }
  };

  const handleDeleteCard = (taskId) => {
    setReadyTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div>
      <h2>Ready</h2>
      {readyTasks.map((task) => (
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
      <button
        onClick={handleAddCard}
        disabled={backlogTasks.length === 0}
        style={{
          cursor: backlogTasks.length === 0 ? "not-allowed" : "pointer",
        }}
      >
        {backlogTasks.length === 0 ? "No tasks in Backlog" : "+ Add card"}
      </button>
    </div>
  );
};

export default Ready;
