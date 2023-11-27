import React, { createContext, useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";
import { ISessionResponse } from "../interfaces/SessionResponse.interface";

interface IAuthentication {
  authenticated: boolean;
  loading: boolean;
}

export interface IAuthContext {
  authentication: IAuthentication;
  setAuthentication: React.Dispatch<React.SetStateAction<IAuthentication>>;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextWrapper: React.FC<IProps> = ({ children }) => {
  const { data, loading } = useFetch<ISessionResponse>("user/validateSession");

  const [authentication, setAuthentication] = useState<IAuthentication>({
    authenticated: false,
    loading: true,
  });

  useEffect(() => {
    setAuthentication({
      authenticated: data?.validSession || false,
      loading: loading,
    });
  }, [data, loading]);

  return (
    <AuthContext.Provider value={{ authentication, setAuthentication }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextWrapper;
