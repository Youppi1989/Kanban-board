import React, { useState } from "react";

const Backlog = ({ tasks, onAddTask, onMoveTask }) => {
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
      onAddTask(newTask, "ready"); // Передаем тип "ready" вместо "backlog"
      setIsAddingTask(false); // Устанавливаем флаг добавления задачи в false после добавления
      setNewTaskName(""); // Очищаем поле ввода названия задачи
    }
  };

  return (
    <div>
      <h2>Backlog</h2>
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
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

export default Backlog;
