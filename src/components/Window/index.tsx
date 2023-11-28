import React from "react";
import classes from "./Window.module.css";

interface IProps {
  visible: boolean;
  children: React.ReactNode;
}

const Window: React.FC<IProps> = ({ children, visible }) => {
  return (
    <div className={`${classes.window_wrapper} ${visible && classes.active}`}>
      {children}
    </div>
  );
};

export default Window;
