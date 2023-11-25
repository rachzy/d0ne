import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ContentBox.module.css";

import { defaultPaths } from "../../config.json";

interface IProps {
  children: React.ReactNode;
  authenticated: boolean;
  authRequirement: "authenticated" | "not_authenticated" | "neutral";
  redirectFunction: (urn: string) => void;
  setVisibleWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContentBox: React.FC<IProps> = ({
  children,
  authRequirement: pageType,
  authenticated,
  redirectFunction
}) => {
  const navigate = useNavigate();

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
  }, [authenticated, navigate, pageType, redirectFunction]);

  return <div className={`${classes.content_box}`}>{children}</div>;
};

export default ContentBox;
