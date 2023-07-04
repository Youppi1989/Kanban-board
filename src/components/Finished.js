import React, { useState } from "react";
import { Link } from "react-router-dom";

const Finished = ({
  inProgressTasks,
  finishedTasks,
  setFinishedTasks,
  addNewTask,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddNewTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskSelection = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleMoveTask = () => {
    const selectedTask = inProgressTasks.find(
      (task) => task.id === Number(selectedTaskId)
    );

    if (selectedTask) {
      addNewTask("finished", selectedTask.title);
      setFinishedTasks((prevTasks) => [...prevTasks, selectedTask]);
    }
  };

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

  return (
    <div className="column">
      <h2>Finished</h2>
      {finishedTasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </div>
      ))}
      {/* Add the new issues */}
      {dataMock[0].issues.map((issue) => (
        <div key={issue.id}>
          <Link to={`/tasks/${issue.id}`}>{issue.name}</Link>
        </div>
      ))}

      {isAddingTask ? (
        <div>
          <select value={selectedTaskId} onChange={handleTaskSelection}>
            <option value="">Select a task</option>
            {inProgressTasks.map((task) => (
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
          disabled={inProgressTasks.length === 0}
        >
          + Add card
        </button>
      )}
    </div>
  );
};

export default Finished;
