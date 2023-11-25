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

const App = () => {
  const navigate = useNavigate();

  const [visibleWindow, setVisibleWindow] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  function redirectFunction(urn: string) {
    setVisibleWindow(false);

    setTimeout(() => {
      navigate(urn);
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

  return (
    <Window visible={visibleWindow}>
      <Routes>
        <Route
          index
          element={
            <ContentBox
              onLoad={() => {
                setVisibleWindow(true);
              }}
            >
              <Index
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
                setVisible={setVisibleWindow}
                redirectFunction={redirectFunction}
              />
            </ContentBox>
          }
        />
        <Route
          path="tasks"
          element={
            <ContentBox
              onLoad={() => {
                console.log("try");
                if (!tasks) return;
                setVisibleWindow(true);
              }}
              dependencies={[tasks]}
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
