import React, { useEffect } from "react";
import classes from "./ContentBox.module.css";

interface IProps {
  onLoad: () => void;
  dependencies?: unknown[];
  children: React.ReactNode;
}

const ContentBox: React.FC<IProps> = ({ onLoad, dependencies, children }) => {
  useEffect(() => {
    onLoad();
  }, dependencies || []);

  return <div className={`${classes.content_box}`}>{children}</div>;
};

export default ContentBox;
