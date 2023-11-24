import React from 'react'
import classes from './Window.module.css';

interface IProps {
    children: React.ReactNode;
}

const Window: React.FC<IProps> = ({children}) => {
  return (
    <div className={classes.window_wrapper}>
        {children}
    </div>
  )
}

export default Window