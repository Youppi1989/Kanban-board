import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const TaskDetail = ({ tasks }) => {
  const { taskId } = useParams();
  const history = useHistory();
  const [task, setTask] = useState(null);
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskData = tasks.find((task) => task.id === taskId);
        setTask(taskData);
        setDescription(taskData.description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [taskId, tasks]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    const updatedTask = { ...task, description };
    const updatedTasks = tasks.map((t) => (t.id === taskId ? updatedTask : t));
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
      <h2>{task.name}</h2>
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
