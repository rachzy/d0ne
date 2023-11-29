import React, { createContext, useContext, useEffect, useState } from "react";

import Axios, { AxiosError } from "axios";

import useFetch from "../hooks/useFetch";
import { ISessionResponse } from "../interfaces/SessionResponse.interface";
import { ICreateUser } from "../interfaces/CreateUser.interface";
import { IServerContext, ServerContext } from "./ServerContext";

interface IAuthentication {
  authenticated: boolean;
  loading: boolean;
}

export interface IRequestResponse {
  message: string;
  successful: boolean;
}

export interface IAuthContext {
  authentication: IAuthentication;
  register: (newUser: ICreateUser) => Promise<IRequestResponse>;
  login: (email: string, password: string) => Promise<IRequestResponse>;
  logout: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<IAuthContext | null>(null);

const AuthContextWrapper: React.FC<IProps> = ({ children }) => {
  const { data, loading } = useFetch<ISessionResponse>("user/validateSession");

  const { serverDomain } = useContext(ServerContext) as IServerContext;

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

  async function register(newUser: ICreateUser): Promise<IRequestResponse> {
    let finalResponse: IRequestResponse;

    try {
      await Axios.post(`${serverDomain}/user/register`, newUser, {
        withCredentials: true,
      });
      setAuthentication({
        authenticated: true,
        loading: false,
      });

      finalResponse = {
        message: "Account successfully crated",
        successful: true,
      };
    } catch (error) {
      if (!(error instanceof AxiosError) || !error.response) {
        return (finalResponse = {
          message: "The server is offline. Please, try again later.",
          successful: false,
        });
      }

      const { status, data } = error.response;

      if (!data.message) {
        return (finalResponse = {
          message: `The server returned and unknown error (${status}). Please, try again later.`,
          successful: false,
        });
      }

      const { message } = data;

      finalResponse = {
        message: message,
        successful: false,
      };
    }

    return finalResponse;
  }

  async function login(
    email: string,
    password: string
  ): Promise<IRequestResponse> {
    let finalResponse: IRequestResponse;

    try {
      await Axios.get(
        `${serverDomain}/user/auth?email=${email}&password=${password}`,
        { withCredentials: true }
      );
      setAuthentication({
        authenticated: true,
        loading: false,
      });

      finalResponse = {
        message: "Successfully authenticated!",
        successful: true,
      };
    } catch (error) {
      if (!(error instanceof AxiosError) || !error.response) {
        return (finalResponse = {
          message: "The server is currently offline. Please, try again later.",
          successful: false,
        });
      }

      const { data, status } = error.response;

      if (data && data.message) {
        return (finalResponse = {
          message: data.message,
          successful: false,
        });
      }

      return (finalResponse = {
        message: `The server returned an unknown error(${status}). Please, try again later.`,
        successful: false,
      });
    }

    return finalResponse;
  }

  async function logout() {
    await Axios.delete(`${serverDomain}/user/logout`, {
      withCredentials: true,
    });

    setAuthentication({
      authenticated: false,
      loading: false,
    });
  }

  return (
    <AuthContext.Provider value={{ authentication, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
