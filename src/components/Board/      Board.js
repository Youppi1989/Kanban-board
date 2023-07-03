import React, { useState } from 'react';
import BoardColumn from './BoardColumn';
import { tasksData } from '../data/tasksData';

const Board = () => {
  const [tasks, setTasks] = useState(tasksData);

  const handleAddCard = (columnId, newTask) => {
   
  };

  const handleMoveCard = (taskId, destinationColumnId) => {

  };

  return (
    <div className="board">
      <BoardColumn
        columnId="backlog"
        title="Backlog"
        tasks={tasks}
        onAddCard={handleAddCard}
        onMoveCard={handleMoveCard}
      />
      {}
    </div>
  );
};

export default Board;
