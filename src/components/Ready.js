import React, { useState } from "react";

const Ready = ({ tasks, onAddTask, onMoveTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const handleAddCard = () => {
    setIsAddingTask(true);
  };

  const handleInputChange = (event) => {
    setNewTaskName(event.target.value);
  };

  const handleSubmit = () => {
    if (newTaskName.trim() !== "") {
      const newTask = {
        id: Date.now().toString(),
        name: newTaskName,
        description: "",
      };
      onAddTask(newTask, "backlog"); // Передаем тип "backlog" вместо "ready"
    }
    setNewTaskName("");
    setIsAddingTask(false);
  };

  const handleMoveCard = (taskId) => {
    onMoveTask(taskId, "inProgress");
  };

  return (
    <div>
      <h2>Ready</h2>
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
          <button onClick={() => handleMoveCard(task.id)}>
            Move to In Progress
          </button>
        </div>
      ))}
      {isAddingTask ? (
        <div className="card">
          <input
            type="text"
            value={newTaskName}
            onChange={handleInputChange}
            placeholder="Enter task name"
          />
          <button onClick={handleSubmit} disabled={newTaskName.trim() === ""}>
            Submit
          </button>
        </div>
      ) : (
        <button onClick={handleAddCard}>+ Add card</button>
      )}
    </div>
  );
};

export default Ready;
