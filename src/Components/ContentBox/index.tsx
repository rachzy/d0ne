import React, { useEffect, useContext } from "react";
import classes from "./ContentBox.module.css";

import { defaultPaths } from "../../config.json";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";

interface IProps {
  children: React.ReactNode;
  authenticated: boolean;
  authRequirement: "authenticated" | "not_authenticated" | "neutral";
}

const ContentBox: React.FC<IProps> = ({
  children,
  authRequirement: pageType,
  authenticated,
}) => {
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;

  useEffect(() => {
    switch (pageType) {
      case "authenticated":
        if (!authenticated) {
          redirectFunction(defaultPaths.notAuthenticated);
        }
        break;
      case "not_authenticated":
        if (authenticated) {
          redirectFunction(defaultPaths.alreadyAuthenticated);
        }
        break;
      default:
        break;
    }
  }, [authenticated, pageType, redirectFunction]);

  return (
    <div className={`${classes.content_box}`}>
      <div className={`${classes.subcontent}`}>{children}</div>
    </div>
  );
};

export default ContentBox;
