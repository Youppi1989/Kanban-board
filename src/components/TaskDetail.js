import React from "react";
import { useParams } from "react-router-dom";

const TaskDetail = ({ tasks }) => {
  const { taskId } = useParams();
  const task = tasks.find((task) => task.id === taskId);

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskDetail;
