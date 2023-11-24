import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Index from "./Pages/Index";
import Window from "./Components/Window";
import Tasks from "./Pages/Tasks";
import AddTask from "./Pages/AddTask";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Window>
        <Routes>
          <Route
            index
            element={
              <Index
                authenticated={authenticated}
                setAuthenticated={setAuthenticated}
              />
            }
          />
          <Route 
          path='tasks'
          element={
            <Tasks />
          }
          />
          <Route 
          path='addtask'
          element={
            <AddTask />
          }
          />
        </Routes>
      </Window>
    </Router>
  );
};

export default App;
