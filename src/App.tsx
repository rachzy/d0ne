import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";

import Index from "./Pages/Index";
import Window from "./Components/Window";
import Tasks from "./Pages/Tasks";
import AddTask from "./Pages/AddTask";
import { IUser } from "./interfaces/User.interface";
import { ITask } from "./interfaces/Task.interface";
import ContentBox from "./Components/ContentBox";
import Register from "./Pages/Register";

const App = () => {
  const navigate = useNavigate();

  const [visibleWindow, setVisibleWindow] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  function redirectFunction(urn: string) {
    setVisibleWindow(false);

    setTimeout(() => {
      navigate(urn);
      setVisibleWindow(true);
    }, 500);
  }

  useEffect(() => {
    if (!authenticated) return setUserData(null);
    setUserData({
      id: 69,
      email: "rachzy@gmail.com",
      nickname: "rachzy",
    });
  }, [authenticated]);

  useEffect(() => {
    if (!userData || !userData.id) return;
    setTimeout(() => {
      setTasks([
        {
          title: "Example",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
      ]);
    }, 1000);
  }, [userData]);

  const pageProps = { setVisibleWindow, authenticated, redirectFunction };

  return (
    <Window visible={visibleWindow}>
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
                redirect={redirectFunction}
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
                redirect={redirectFunction}
              />
            </ContentBox>
          }
        />
        <Route
          path="tasks"
          element={
            <ContentBox
              authRequirement="authenticated"
              {...pageProps}
            >
              <Tasks tasks={tasks} />
            </ContentBox>
          }
        />
        <Route path="addtask" element={<AddTask />} />
      </Routes>
    </Window>
  );
};

export default App;
