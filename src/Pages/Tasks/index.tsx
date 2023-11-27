import React, { Fragment, useContext, useState } from "react";
import { FaRightFromBracket } from "react-icons/fa6";

import Task from "../../components/Task";
import Loader from "../../components/Loader";
import TasksWrapper from "../../components/TasksWrapper";
import Switcher, { IOption } from "../../components/Switcher";
import Button from "../../components/Button";
import { AddTaskModalContext } from "../../components/AddTaskModal";
import { ITaskContext, TasksContext } from "../../contexts/TaskContext";
import { IUserContext, UserContext } from "../../contexts/UserContext";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

const Tasks = () => {
  const {logout} = useContext(AuthContext) as IAuthContext;
  const { tasks, removeTask } = useContext(TasksContext) as ITaskContext;
  const { user } = useContext(UserContext) as IUserContext;

  const [filterTasksByCompleted, setFilterTasksByCompleted] = useState(false);
  const addTaskModal = useContext(AddTaskModalContext);

  if (!user || !tasks) return <Loader />;

  const { nickname } = user;

  function handleSwitchOptionClick(newValue: boolean) {
    setFilterTasksByCompleted(newValue);
  }

  const switcherOptions: IOption[] = [
    {
      label: "Not completed",
      value: "not_completed",
      onSelect: () => handleSwitchOptionClick(false),
    },
    {
      label: "Completed",
      value: "completed",
      onSelect: () => handleSwitchOptionClick(true),
    },
  ];

  function renderTasks(): React.ReactNode {
    if(!tasks) return;
    return tasks.map((task) => {
      if (task.completed !== filterTasksByCompleted) return null;
      return <Task key={task.id} task={task} deleteTask={removeTask} />;
    });
  }

  function handleButtonClick() {
    if (!addTaskModal) return;
    addTaskModal.showModal();
  }

  return (
    <Fragment>
      <FaRightFromBracket onClick={logout} />
      <h2>Welcome, {nickname}</h2>
      <h3>Order your tasks by:</h3>
      <Switcher options={switcherOptions} />
      <TasksWrapper>{renderTasks()}</TasksWrapper>
      <Button onClick={handleButtonClick}>+ Create Task</Button>
    </Fragment>
  );
};

export default Tasks;
