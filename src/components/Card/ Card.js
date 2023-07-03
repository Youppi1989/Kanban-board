import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ task, onMoveCard }) => {
  const handleMoveCard = () => {
    const destinationColumnId = 'inProgress'; 
    onMoveCard(task.id, destinationColumnId);
  };

  return (
    <div className="card">
      <Link to={`/tasks/${task.id}`}>
        <h3>{task.title}</h3>
      </Link>
      {}
      <button onClick={handleMoveCard}>Move</button>
    </div>
  );
};

export default Card;
