import React, { useState } from "react";

const Ready = ({ tasks, onAddTask, onMoveTask }) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [newTaskName, setNewTaskName] = useState(""); // Добавлено состояние для нового названия задачи

  const handleAddCard = () => {
    setIsAddingTask(true);
  };

  const handleTaskChange = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleInputChange = (event) => {
    // Обработчик изменения значения нового названия задачи
    setNewTaskName(event.target.value);
  };

  const handleMoveCard = () => {
    if (selectedTask) {
      const task = tasks.find((task) => task.name === selectedTask);
      onMoveTask(task.id, "ready");
      setSelectedTask("");
      setIsAddingTask(false);
    }
  };

  const handleAddNewTask = () => {
    if (newTaskName.trim() !== "") {
      // Добавлена проверка на пустое значение
      const newTask = {
        id: Date.now().toString(),
        name: newTaskName,
        description: "",
      };
      onAddTask(newTask, "backlog");
      setNewTaskName(""); // Сброс значения нового названия задачи
    }
  };

  return (
    <div>
      <h2>Ready</h2>
      {tasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
          <button onClick={() => onMoveTask(task.id, "inProgress")}>
            Move to In Progress
          </button>
        </div>
      ))}
      {isAddingTask ? (
        <div className="card">
          <select value={selectedTask} onChange={handleTaskChange}>
            <option value="">Select a task</option>
            {tasks
              .filter((task) => task.type === "backlog")
              .map((task) => (
                <option key={task.id} value={task.name}>
                  {task.name}
                </option>
              ))}
          </select>
          <button onClick={handleMoveCard}>Submit</button>
        </div>
      ) : (
        <div className="card">
          <input
            type="text"
            value={newTaskName}
            onChange={handleInputChange}
            placeholder="Enter task name"
          />
          <button
            onClick={handleAddNewTask}
            disabled={newTaskName.trim() === ""}
          >
            Submit
          </button>
        </div>
      )}
      {!isAddingTask &&
        tasks.filter((task) => task.type === "backlog").length === 0 && (
          <p>No tasks available in backlog</p>
        )}
    </div>
  );
};

export default Ready;
