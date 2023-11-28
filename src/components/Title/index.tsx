import React from "react";
import classes from "./Title.module.css";

interface IProps {
  children: string;
}

const Title: React.FC<IProps> = ({ children }) => {
  return <h1 className={`${classes.main_title}`}>{children}</h1>;
};

export default Title;
