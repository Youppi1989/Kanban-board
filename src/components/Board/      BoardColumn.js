import React, { useState } from 'react';
import Card from '../Card/Card';
import CardForm from '../Card/CardForm';

const BoardColumn = ({ columnId, title, tasks, onAddCard, onMoveCard }) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddCard = () => {
    if (newTaskTitle.trim() !== '') {
      onAddCard(columnId, { id: tasks.length + 1, title: newTaskTitle });
      setIsAddingCard(false);
      setNewTaskTitle('');
    }
  };

  const handleMoveCard = (taskId, destinationColumnId) => {
    onMoveCard(taskId, destinationColumnId);
  };

  return (
    <div className="board-column">
      <h2>{title}</h2>
      <div className="cards">
        {tasks.map((task) => (
          <Card key={task.id} task={task} onMoveCard={handleMoveCard} />
        ))}
      </div>
      {isAddingCard ? (
        <CardForm
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onCancel={() => setIsAddingCard(false)}
          onSubmit={handleAddCard}
        />
      ) : (
        <button onClick={() => setIsAddingCard(true)}>+ Add card</button>
      )}
    </div>
  );
};

export default BoardColumn;
