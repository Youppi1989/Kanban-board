import React, { useState } from "react";
import { Link } from "react-router-dom";

const Backlog = ({ tasks, addNewTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleNewTaskTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddNewTask = () => {
    if (!isAddingTask) {
      setIsAddingTask(true);
    } else {
      addNewTask("backlog", newTaskTitle);
      setIsAddingTask(false);
      setNewTaskTitle("");
    }
  };

  return (
    <div>
      <h2>Backlog</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        </div>
      ))}
      {isAddingTask ? (
        <div>
          <input type="text" value={newTaskTitle} onChange={handleNewTaskTitleChange} />
          <button onClick={handleAddNewTask}>Submit</button>
        </div>
      ) : (
        <button onClick={handleAddNewTask}>+ Add card</button>
      )}
    </div>
  );
};

export default Backlog;
