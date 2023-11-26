import React from "react";
import classes from "./Option.module.css";

interface IProps {
  selected: boolean;
  children: string;
  onClick: () => void;
}

const Option: React.FC<IProps> = ({ selected, onClick, children }) => {
  return (
    <button onClick={onClick} className={`${classes.option} ${selected && classes.selected}`}>
      {children}
    </button>
  );
};

export default Option;
