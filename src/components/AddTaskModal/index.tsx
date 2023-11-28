import React, {
  MutableRefObject,
  useRef,
  createContext,
  useState,
  useContext,
} from "react";
import classes from "./AddTaskModal.module.css";

import Button from "../Button";
import { ITask } from "../../interfaces/Task.interface";
import Switcher, { IOption } from "../Switcher";
import { FaTimes } from "react-icons/fa";
import { ITaskContext, TasksContext } from "../../contexts/TaskContext";
import { ICreateTask } from "../../interfaces/CreateTask.interface";

export interface IModal {
  title?: string;
  task?: ITask;
  visible: boolean;
}

interface IChangeModal {
  visibleModal: boolean;
  showModal: (data?: Omit<IModal, "visible">) => void;
  vanishModal: () => void;
}

export const AddTaskModalContext = createContext<IChangeModal | null>(null);

interface IInputValues {
  title: string;
  description: string;
}

interface IProps {
  children: React.ReactNode;
}

const AddTaskModal: React.FC<IProps> = ({ children }) => {
  const { createTask, editTask } = useContext(TasksContext) as ITaskContext;

  const [modalData, setModalData] = useState<IModal>({ visible: false });
  const [completedTask, setCompletedTask] = useState(false);

  const [titleInput, descriptionInput] = [
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLTextAreaElement>,
  ];
  const inputs = [titleInput, descriptionInput];
  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;

  const completedOptions: IOption[] = [
    {
      label: "Not completed",
      value: "not_completed",
      onSelect: () => {
        setCompletedTask(false);
      },
    },
    {
      label: "Completed",
      value: "completed",
      onSelect: () => {
        setCompletedTask(true);
      },
    },
  ];

  function showModal(data?: Omit<IModal, "visible">) {
    setModalData({ ...data, visible: true });

    if (!data || !data.task) {
      return inputs.forEach((input) => (input.current.value = ""));
    }

    const { title, description, completed } = data.task;
    titleInput.current.value = title;
    descriptionInput.current.value = description;
    setCompletedTask(completed);
  }

  function vanishModal() {
    inputs.forEach((input) => (input.current.defaultValue = ""));
    setModalData({ task: undefined, visible: false });
  }

  const changeModal: IChangeModal = {
    showModal: showModal,
    vanishModal: vanishModal,
    visibleModal: modalData.visible,
  };

  async function handleButtonClick() {
    callbackError.current.textContent = "";

    let inputValues: IInputValues | object = {};
    inputs.forEach((input) => {
      const { name, minLength, value } = input.current;
      if (value.length < minLength) {
        input.current.style.borderColor = "red";
      } else {
        input.current.style.borderColor = "chartreuse";
      }

      inputValues = {
        ...inputValues,
        [name]: value,
      };
    });

    const { title, description } = inputValues as IInputValues;

    if (!title)
      return (callbackError.current.textContent =
        "Please fill all the fields.");

    const newTask: ICreateTask = {
      title,
      description,
      completed: completedTask,
    };
    if (modalData.task) {
      const { id } = modalData.task;
      await editTask(id, newTask);
    } else {
      await createTask(newTask);
    }

    vanishModal();
  }

  return (
    <AddTaskModalContext.Provider value={changeModal}>
      <div
        className={`${classes.modal_window} ${
          modalData.visible && classes.active
        }`}
      >
        <div className={`${classes.sub_content}`}>
          <FaTimes onClick={vanishModal} />
          <h1>{modalData.title || "New Task"}</h1>
          <p>
            <span style={{ color: "red" }} ref={callbackError}></span>
          </p>
          <input
            name="title"
            placeholder="Task title..."
            type="text"
            ref={titleInput}
            minLength={1}
          />
          <textarea
            name="description"
            placeholder="Task description..."
            ref={descriptionInput}
            minLength={0}
          ></textarea>
          <Switcher options={completedOptions} />
          <Button onClick={handleButtonClick}>
            {modalData.task ? "Edit task" : "Create task"}
          </Button>
        </div>
      </div>
      {children}
    </AddTaskModalContext.Provider>
  );
};

export default AddTaskModal;
