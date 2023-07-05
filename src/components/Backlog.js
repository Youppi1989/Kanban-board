import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Backlog = ({ addNewTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const dataMock = [
    {
      title: "backlog",
      issues: [
        {
          id: "12345",
          name: "Login page – performance issues",
          description: "Fix performance issues on the login page",
        },
        {
          id: "54321",
          name: "Sprint bugfix",
          description: "Fix all the bugs in the sprint",
        },
      ],
    },
  ];

  const handleNewTaskTitleChange = (e) => {
    setNewTaskTitle(e.target.value);
  };

  const handleAddNewTask = () => {
    if (!isAddingTask) {
      setIsAddingTask(true);
    } else {
      addNewTask("backlog", newTaskTitle);
      setIsAddingTask(false);
      setNewTaskTitle("");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);

    // Update the order of tasks in the state
    setTasks(updatedTasks);
  };

  return (
    <div className="column">
      <h2>Backlog</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="backlog">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      className="card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Link to={`/task/${task.id}`}>{task.title}</Link>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add the new tasks */}
      {dataMock[0].issues.map((issue) => (
        <div className="card" key={issue.id}>
          <Link to={`/task/${issue.id}`}>{issue.name}</Link>
        </div>
      ))}

      {isAddingTask ? (
        <div>
          <input
            type="text"
            value={newTaskTitle}
            onChange={handleNewTaskTitleChange}
          />
          <button onClick={handleAddNewTask}>Submit</button>
        </div>
      ) : (
        <button onClick={handleAddNewTask}>+ Add card</button>
      )}
    </div>
  );
};

export default Backlog;
