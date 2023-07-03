import React, { useState } from "react";
import { Link } from "react-router-dom";

const Ready = ({ backlogTasks, readyTasks, setReadyTasks, addNewTask }) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddNewTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskSelection = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleMoveTask = () => {
    const selectedTask = backlogTasks.find((task) => task.id === Number(selectedTaskId));

    if (selectedTask) {
      addNewTask("ready", selectedTask.title);
      setReadyTasks((prevTasks) => [...prevTasks, selectedTask]);
    }
  };

  return (
    <div>
      <h2>Ready</h2>
      {readyTasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </div>
      ))}
      {isAddingTask ? (
        <div>
          <select value={selectedTaskId} onChange={handleTaskSelection}>
            <option value="">Select a task</option>
            {backlogTasks.map((task) => (
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
        <button onClick={handleAddNewTask} disabled={backlogTasks.length === 0}>
          + Add card
        </button>
      )}
    </div>
  );
};

export default Ready;
