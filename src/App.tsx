import "./App.css";

import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Tasks from "./pages/Tasks";
import ContentBox from "./components/ContentBox";
import Register from "./pages/Register";
import AddTaskModal from "./components/AddTaskModal";
import TaskContextWrapper from "./contexts/TaskContext";
import UserContextWrapper from "./contexts/UserContext";
import WindowContextWrapper from "./contexts/WindowContext";
import AuthContextWrapper from "./contexts/AuthContext";

const App = () => {
  return (
    <WindowContextWrapper>
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
    </WindowContextWrapper>
  );
};

export default App;
