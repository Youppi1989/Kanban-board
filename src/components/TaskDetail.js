import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetail = ({ tasks }) => {
  const { taskId } = useParams();
  const task = tasks.find((task) => task.id === Number(taskId));
  const [description, setDescription] = useState(task ? task.description : "");
  const [isEditing, setIsEditing] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Update the description of the task
    task.description = description;
    // Save the updated tasks
    // ... your code to save the tasks

    setIsEditing(false);
  };

  return (
    <div>
      <h2>Task Detail</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          {isEditing ? (
            <div>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
              <button onClick={handleSaveClick}>Save</button>
            </div>
          ) : (
            <div>
              <p>{description || "This task has no description"}</p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};

export default TaskDetail;
