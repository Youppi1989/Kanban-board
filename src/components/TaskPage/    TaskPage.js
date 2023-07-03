import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const TaskPage = () => {
  const { taskId } = useParams();
  const history = useHistory();
  const [taskDescription, setTaskDescription] = useState('');

  const handleEditDescription = () => {

  };

  return (
    <div>
      <h2>Task Page - {taskId}</h2>
      <h3>{taskTitle}</h3>
      <p>{taskDescription || 'This task has no description'}</p>
      {}
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
};

export default TaskPage;
