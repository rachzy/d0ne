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

const App = () => {
  const validateSession = useFetch<ISessionResponse>("user/validateSession");

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { data, loading, error } = validateSession;

    if (loading || error || !data?.validSession) return;
    setAuthenticated(true);
  }, [validateSession]);

  const pageProps = { authenticated };

  return (
    <WindowContextWrapper>
      <UserContextWrapper authenticated={authenticated}>
        <TaskContextWrapper authenticated={authenticated}>
          <AddTaskModal>
            <Routes>
              <Route
                index
                element={
                  <ContentBox
                    authRequirement={"not_authenticated"}
                    {...pageProps}
                  >
                    <Index
                      setAuthenticated={setAuthenticated}
                    />
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
                    <Register
                      setAuthenticated={setAuthenticated}
                    />
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
