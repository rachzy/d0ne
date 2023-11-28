import React, { useState } from "react";
import classes from "./Button.module.css";
import Loader from "../Loader";

interface IProps {
  children: string;
  backgroundColor?: string;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ children, backgroundColor, onClick }) => {
  const [loadingAnimation, setLoadingAnimation] = useState(false);

  return (
    <button
      className={classes.main_button}
      style={{ backgroundColor }}
      onClick={async () => {
        setLoadingAnimation(true);
        await onClick();
        setLoadingAnimation(false);
      }}
    >
      {loadingAnimation ? <Loader /> : children}
    </button>
  );
};

export default Button;
