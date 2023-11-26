import React, { useState, useContext } from "react";
import classes from "./Task.module.css";

import { ITask } from "../../interfaces/Task.interface";

import { FaTimes, FaChevronRight, FaPencilAlt } from "react-icons/fa";
import { AddTaskModalContext } from "../AddTaskModal";

interface IProps {
  task: ITask;
  deleteTask: (id: number) => void;
}

const Task: React.FC<IProps> = ({ task, deleteTask }) => {
  const [visibleDescription, setVisibleDescription] = useState(false);
  const addTaskModal = useContext(AddTaskModalContext);

  const { title, description, completed } = task;

  function handleShowDescriptionIconClick() {
    setVisibleDescription((currentValue) => !currentValue);
  }

  function handleEditIconClick() {
    addTaskModal?.showModal({ task: task });
  }

  function handleDeleteIconClick() {
    deleteTask(task.id);
  }

  return (
    <div
      className={`${classes.task} ${completed && classes.completed} ${
        visibleDescription && classes.visible_description
      }`}
    >
      <div className={`${classes.header}`}>
        <div>
          <FaChevronRight
            className={`${classes.openDescription}`}
            onClick={handleShowDescriptionIconClick}
          />
          <h3>{title}</h3>
        </div>
        <div>
          <FaPencilAlt onClick={handleEditIconClick} />
          <FaTimes onClick={handleDeleteIconClick} />
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default Task;
