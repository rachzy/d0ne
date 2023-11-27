import React, { createContext, useEffect, useState } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { IUser } from "../interfaces/User.interface";

export interface IUserContext {
  user: IUser | null;
}

interface IProps {
  authenticated: boolean;
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserContextWrapper: React.FC<IProps> = ({ authenticated, children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!authenticated) return;

    async function fetchUser() {
      const { data } = await Axios.get(`${serverDomain}/user/getNickname`);
      setUser(data);
    }
    fetchUser();
  }, [authenticated]);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextWrapper;
