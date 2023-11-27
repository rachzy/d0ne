import React, { createContext, useState } from "react";
import Window from "../components/Window";
import { useNavigate } from "react-router-dom";

export interface IWindowContext {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  redirectFunction: (urn: string) => void;
}

interface IProps {
  children: React.ReactNode;
}

export const WindowContext = createContext<IWindowContext | null>(null);

const WindowContextWrapper: React.FC<IProps> = ({ children }) => {
    const navigate = useNavigate();
  const [visible, setVisible] = useState(true);

  function redirectFunction(urn: string) {
    setVisible(false);

    setTimeout(() => {
      navigate(urn);
      setVisible(true);
    }, 500);
  }

  return (
    <WindowContext.Provider value={{ visible, setVisible, redirectFunction }}>
      <Window visible={visible}>{children}</Window>
    </WindowContext.Provider>
  );
};

export default WindowContextWrapper;
