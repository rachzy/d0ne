import React from 'react'
import classes from './TasksWrapper.module.css';

interface IProps {
    children: React.ReactNode;
    transitioning: boolean;
}

const TasksWrapper: React.FC<IProps> = ({children, transitioning}) => {
  return (
    <div className={`${classes.tasks_wrapper} ${transitioning && classes.transitioning}`}>
        {children}
    </div>
  )
}

export default TasksWrapper