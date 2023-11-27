import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import ContentBox from "./components/ContentBox";
import Register from "./pages/Register";
import AddTaskModal from "./components/AddTaskModal";
import useFetch from "./hooks/useFetch";
import { ISessionResponse } from "./interfaces/SessionResponse.interface";
import TaskContextWrapper from "./contexts/TaskContext";
import UserContextWrapper from "./contexts/UserContext";
import WindowContextWrapper from "./contexts/WindowContext";

export interface IAuthentication {
  authenticated: boolean;
  loading: boolean;
}

const App = () => {
  const {data, loading } = useFetch<ISessionResponse>("user/validateSession");

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

  const pageProps = { authentication };

  return (
    <WindowContextWrapper>
      <UserContextWrapper authentication={authentication}>
        <TaskContextWrapper authentication={authentication}>
          <AddTaskModal>
            <Routes>
              <Route
                index
                element={
                  <ContentBox
                    authRequirement={"not_authenticated"}
                    {...pageProps}
                  >
                    <Index setAuthentication={setAuthentication} />
                  </ContentBox>
                }
              />
              <Route
                path="/register"
                element={
                  <ContentBox
                    authRequirement={"not_authenticated"}
                    {...pageProps}
                  >
                    <Register setAuthentication={setAuthentication} />
                  </ContentBox>
                }
              />
              <Route
                path="tasks"
                element={
                  <ContentBox authRequirement="authenticated" {...pageProps}>
                    <Tasks />
                  </ContentBox>
                }
              />
            </Routes>
          </AddTaskModal>
        </TaskContextWrapper>
      </UserContextWrapper>
    </WindowContextWrapper>
  );
};

export default App;
