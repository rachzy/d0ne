import React from 'react'
import classes from './TasksWrapper.module.css';

interface IProps {
    children: React.ReactNode;
}

const TasksWrapper: React.FC<IProps> = ({children}) => {
  return (
    <div className={classes.tasks_wrapper}>
        {children}
    </div>
  )
}

export default TasksWrapper