import React, { createContext, useEffect, useState, useContext } from "react";

import Axios from "axios";
import { serverDomain } from "../config.json";

import { IUser } from "../interfaces/User.interface";
import { AuthContext, IAuthContext } from "./AuthContext";

export interface IUserContext {
  user: IUser | null;
}

interface IProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

const UserContextWrapper: React.FC<IProps> = ({ children }) => {
  const {authentication} = useContext(AuthContext) as IAuthContext;
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
