import React, { useState } from "react";
import { Link } from "react-router-dom";

const InProgress = ({
  readyTasks,
  inProgressTasks,
  setInProgressTasks,
  addNewTask,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

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

  const handleAddNewTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskSelection = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleMoveTask = () => {
    const selectedTask = readyTasks.find((task) => task.id === selectedTaskId);

    if (selectedTask) {
      addNewTask("inProgress", selectedTask.title);
      setInProgressTasks((prevTasks) => [...prevTasks, selectedTask]);
    }
  };

  return (
    <div className="column">
      <h2>In Progress</h2>
      {inProgressTasks.map((task) => (
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
          <select value={selectedTaskId} onChange={handleTaskSelection}>
            <option value="">Select a task</option>
            {readyTasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.title}
              </option>
            ))}
          </select>
          <button onClick={handleMoveTask} disabled={!selectedTaskId}>
            Submit
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddNewTask}
          disabled={readyTasks.length === 0}
        >
          + Add card
        </button>
      )}
    </div>
  );
};

export default InProgress;
