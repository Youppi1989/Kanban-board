import React, { useState } from "react";

const Backlog = () => {
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const dataMock = [
    {
      title: "backlog",
      issues: [
        {
          id: "12345",
          name: "Login page – performance issues",
          description: "Fix performance issues on the login page",
        },
        {
          id: "54321",
          name: "Sprint bugfix",
          description: "Fix all the bugs in the sprint",
        },
      ],
    },
  ];

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
      setBacklogTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setNewTaskName("");
    setIsAddingTask(false);
  };

  return (
    <div>
      <h2>Backlog</h2>
      {backlogTasks.map((task) => (
        <div className="card" key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description || "This task has no description"}</p>
        </div>
      ))}
      {dataMock[0].issues.map((task) => (
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
