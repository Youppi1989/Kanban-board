
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        // Replace with your data fetching logic
        const response = await fetch(`API_URL/tasks/${taskId}`);
        const data = await response.json();
        setTask(data);
        setDescription(data.description);
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
    // Update the task's description in localStorage or an API
    // Replace this with your actual data updating implementation
    // For example, you can use fetch() or axios to send a PUT request
    // with the updated description to the server
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
