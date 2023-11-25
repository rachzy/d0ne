import React, { Fragment } from "react";

import { ITask } from "../../interfaces/Task.interface";

interface IProps {
  tasks: ITask[];
}

const Tasks: React.FC<IProps> = ({ tasks }) => {
  return (
    <Fragment>
      <h1>Tasks page</h1>
    </Fragment>
  );
};

export default Tasks;
