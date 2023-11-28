import React, { useEffect, useContext } from "react";
import classes from "./ContentBox.module.css";

import { defaultPaths } from "../../config.json";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

interface IProps {
  children: React.ReactNode;
  authRequirement: "authenticated" | "not_authenticated" | "neutral";
}

const ContentBox: React.FC<IProps> = ({
  children,
  authRequirement: pageType,
}) => {
  const {authentication} = useContext(AuthContext) as IAuthContext;
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;

  useEffect(() => {
    if(authentication.loading) return;

    switch (pageType) {
      case "authenticated":
        if (!authentication.authenticated) {
          redirectFunction(defaultPaths.notAuthenticated);
        }
        break;
      case "not_authenticated":
        if (authentication.authenticated) {
          redirectFunction(defaultPaths.alreadyAuthenticated);
        }
        break;
      default:
        break;
    }
  }, [authentication, pageType, redirectFunction]);

  return (
    <div className={`${classes.content_box}`}>
      <div className={`${classes.subcontent}`}>{children}</div>
    </div>
  );
};

export default ContentBox;
