import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Здесь должна быть логика для получения задачи по идентификатору taskId
        // Можете использовать ваш собственный код для получения задачи
        const taskData = {
          id: taskId,
          title: "Task " + taskId,
          description: "Description for Task " + taskId,
        };
        setTask(taskData);
        setDescription(taskData.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = { ...task, description };
    setTask(updatedTask);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setDescription(task.description);
    setEditing(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/" className="homeLink">
        &#8592; Back
      </Link>
      <h2>{task.title}</h2>
      {editing ? (
        <div>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{task.description || "This task has no description"}</p>
          <button onClick={handleEditClick}>Edit Description</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
