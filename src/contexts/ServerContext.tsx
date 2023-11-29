import React, { createContext } from "react";

import { serverDomains } from "../config.json";

export interface IServerContext {
  serverDomain: string;
}

export const ServerContext = createContext<IServerContext | null>(null);

interface IProps {
  children: React.ReactNode;
}

const ServerContextWrapper: React.FC<IProps> = ({ children }) => {
  const { local, production } = serverDomains;
  const domain = import.meta.env.PROD ? production : local;
  return (
    <ServerContext.Provider value={{ serverDomain: domain }}>
      {children}
    </ServerContext.Provider>
  );
};

export default ServerContextWrapper;
