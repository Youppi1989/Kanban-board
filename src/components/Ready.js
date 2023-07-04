import React, { useState } from "react";
import { Link } from "react-router-dom";

const Ready = ({ backlogTasks, readyTasks, setReadyTasks, addNewTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

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

  const handleNewTaskTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddNewTask = () => {
    if (!isAddingTask) {
      setIsAddingTask(true);
    } else {
      addNewTask("ready", newTaskTitle);
      setIsAddingTask(false);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="column">
      <h2>Ready</h2>
      {readyTasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </div>
      ))}
      {/* Add the new issues */}
      {dataMock[0].issues.map((issue) => (
        <div className="card" key={issue.id}>
          <Link to={`/tasks/${issue.id}`}>{issue.name}</Link>
        </div>
      ))}

      {isAddingTask ? (
        <div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
          />
          <button onClick={handleAddNewTask}>Submit</button>
        </div>
      ) : (
        <button onClick={handleAddNewTask}>+ Add card</button>
      )}
    </div>
  );
};

export default Ready;
