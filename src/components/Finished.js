import React, { useState } from "react";
import { Link } from "react-router-dom";

const Finished = ({ inProgressTasks, finishedTasks, setFinishedTasks, addNewTask }) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddNewTask = () => {
    setIsAddingTask(true);
  };

  const handleTaskSelection = (e) => {
    setSelectedTaskId(e.target.value);
  };

  const handleMoveTask = () => {
    const selectedTask = inProgressTasks.find((task) => task.id === Number(selectedTaskId));

    if (selectedTask) {
      addNewTask("finished", selectedTask.title);
      setFinishedTasks((prevTasks) => [...prevTasks, selectedTask]);
    }
  };

  return (
    <div>
      <h2>Finished</h2>
      {finishedTasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
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
        <button onClick={handleAddNewTask} disabled={inProgressTasks.length === 0}>
          + Add card
        </button>
      )}
    </div>
  );
};

export default Finished;
