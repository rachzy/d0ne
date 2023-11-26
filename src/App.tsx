import { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";

import Index from "./pages/Index";
import Window from "./components/Window";
import Tasks from "./pages/Tasks";
import { IUser } from "./interfaces/User.interface";
import { ITask } from "./interfaces/Task.interface";
import ContentBox from "./components/ContentBox";
import Register from "./pages/Register";
import AddTaskModal from "./components/AddTaskModal";

const App = () => {
  const navigate = useNavigate();

  const [visibleWindow, setVisibleWindow] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  function deleteTask(id: number) {
    setTasks((currentValue) => currentValue.filter((task) => task.id !== id));
  }

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
          id: 0,
          title: "Completed task",
          description: "Lorem ipsum bla bla bla",
          completed: true,
        },
        {
          id: 166,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 177,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 81,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 199,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 19,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 18,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 17,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 16,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 15,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 14,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 13,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 12,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
        {
          id: 10,
          title: "Incompleted task",
          description: "Lorem ipsum bla bla bla",
          completed: false,
        },
      ]);
    }, 1000);
  }, [userData]);

  const pageProps = { setVisibleWindow, authenticated, redirectFunction };

  return (
    <Window visible={visibleWindow}>
      <AddTaskModal setTasks={setTasks}>
        <Routes>
          <Route
            index
            element={
              <ContentBox authRequirement={"not_authenticated"} {...pageProps}>
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
              <ContentBox authRequirement={"not_authenticated"} {...pageProps}>
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
              <ContentBox authRequirement="authenticated" {...pageProps}>
                <Tasks tasks={tasks} deleteTask={deleteTask} user={userData} />
              </ContentBox>
            }
          />
        </Routes>
      </AddTaskModal>
    </Window>
  );
};

export default App;
