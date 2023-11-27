import React, { createContext, useEffect, useState } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { IUser } from "../interfaces/User.interface";
import { IAuthentication } from "../App";

export interface IUserContext {
  user: IUser | null;
}

interface IProps {
  authentication: IAuthentication;
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserContextWrapper: React.FC<IProps> = ({ authentication, children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (authentication.loading || !authentication.authenticated) return;

    async function fetchUser() {
      const { data } = await Axios.get(`${serverDomain}/user/getData`, {
        withCredentials: true,
      });
      setUser(data);
    }
    fetchUser();
  }, [authentication]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContextWrapper;
