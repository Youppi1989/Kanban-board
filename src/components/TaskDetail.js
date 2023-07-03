import React from "react";
import { useParams } from "react-router-dom";

const TaskDetail = ({ tasks }) => {
  const { taskId } = useParams();
  const task = tasks.find((task) => task.id === Number(taskId));

  return (
    <div>
      <h2>Task Detail</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
};

export default TaskDetail;
