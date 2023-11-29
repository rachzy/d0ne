import "./App.css";

import { Routes, Route } from "react-router-dom";

import TaskContextWrapper from "./contexts/TaskContext";
import UserContextWrapper from "./contexts/UserContext";
import WindowContextWrapper from "./contexts/WindowContext";
import AuthContextWrapper from "./contexts/AuthContext";

import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register";

import ContentBox from "./components/ContentBox";
import AddTaskModal from "./components/AddTaskModal";

import ServerContextWrapper from "./contexts/ServerContext";

const App = () => {
  return (
    <WindowContextWrapper>
      <ServerContextWrapper>
        <AuthContextWrapper>
          <UserContextWrapper>
            <TaskContextWrapper>
              <AddTaskModal>
                <Routes>
                  <Route
                    index
                    element={
                      <ContentBox authRequirement={"not_authenticated"}>
                        <Index />
                      </ContentBox>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <ContentBox authRequirement={"not_authenticated"}>
                        <Register />
                      </ContentBox>
                    }
                  />
                  <Route
                    path="tasks"
                    element={
                      <ContentBox authRequirement="authenticated">
                        <Tasks />
                      </ContentBox>
                    }
                  />
                </Routes>
              </AddTaskModal>
            </TaskContextWrapper>
          </UserContextWrapper>
        </AuthContextWrapper>
      </ServerContextWrapper>
    </WindowContextWrapper>
  );
};

export default App;
