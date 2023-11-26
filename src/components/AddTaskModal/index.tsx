import React, {
  MutableRefObject,
  useRef,
  createContext,
  useState,
} from "react";
import classes from "./AddTaskModal.module.css";

import Button from "../Button";
import { ITask } from "../../interfaces/Task.interface";
import Switcher, { IOption } from "../Switcher";
import { FaTimes } from "react-icons/fa";

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
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const AddTaskModal: React.FC<IProps> = ({ children, setTasks }) => {
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

    if(!data) {
        inputs.forEach((input) => input.current.value = "");
    }
  } 

  function vanishModal() {
    setModalData({ visible: false });
  }

  const changeModal: IChangeModal = {
    showModal: showModal,
    vanishModal: vanishModal,
    visibleModal: modalData.visible,
  };

  function handleButtonClick() {
    callbackError.current.textContent = "";

    let inputValues: IInputValues | object = {};
    inputs.forEach((input) => {
      const { name, value } = input.current;
      if (!value) {
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

    if (!title || !description)
      return (callbackError.current.textContent =
        "Please fill all the fields.");

    if (modalData.task) {
      const { id } = modalData.task;
      setTasks((currentValue) => {
        const oldTasks = currentValue.filter((task) => task.id !== id);
        return [
            { id, title, description, completed: completedTask },
          ...oldTasks,
        ];
      });
    } else {
      setTasks((currentValue) => {
        return [
            {
              id: Date.now(),
              title,
              description,
              completed: completedTask,
            },
          ...currentValue,
        ];
      });
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
            defaultValue={modalData.task?.title || ""}
          />
          <textarea
            name="description"
            placeholder="Task description..."
            ref={descriptionInput}
            defaultValue={modalData.task?.description || ""}
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
