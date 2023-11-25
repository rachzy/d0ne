import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children: string;
  backgroundColor?: string;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ children, backgroundColor, onClick }) => {
  return (
    <button
      className={classes.main_button}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
