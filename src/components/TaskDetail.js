import React from "react";
import { useParams, Link } from "react-router-dom";

function TaskDetail(props) {
  const { id } = useParams();
  const { backlogTasks, readyTasks, inProgressTasks, finishedTasks } = props;

  const findTaskById = (tasks, taskId) => {
    return tasks && tasks.find((task) => task.id === taskId);
  };

  const task =
    findTaskById(backlogTasks, id) ||
    findTaskById(readyTasks, id) ||
    findTaskById(inProgressTasks, id) ||
    findTaskById(finishedTasks, id);

  return (
    <div>
      <h2>Task Detail</h2>
      {task ? (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>
            <Link to="/">Go Back</Link>
          </p>
        </div>
      ) : (
        <p>Task not found.</p>
      )}
    </div>
  );
}

export default TaskDetail;
