import React from 'react'
import classes from './Button.module.css';

interface IProps {
    children: string;
    onClick?: () => void;
}

const Button: React.FC<IProps> = ({children, onClick}) => {
  return (
    <button className={classes.main_button} onClick={onClick}>{children}</button>
  )
}

export default Button