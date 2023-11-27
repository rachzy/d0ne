import React, { Fragment, MutableRefObject, useRef, useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IPage } from "../../interfaces/Page.interface";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";

interface IInputValues {
  nickname: string;
  email: string;
  password: string;
}

const Register: React.FC<IPage> = ({ setAuthenticated }) => {
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;

  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;
  const [nicknameInput, emailInput, passwordInput] = [
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLInputElement>,
  ];
  const inputs = [nicknameInput, emailInput, passwordInput];

  function handleLoginButtonClick() {
    let inputValues: IInputValues | object = {};
    inputs.forEach((input) => {
      const { name, value } = input.current;
      inputValues = {
        ...inputValues,
        [name]: value,
      };
    });

    const { email, nickname, password } = inputValues as IInputValues;
    if (!email || !nickname || !password) {
      callbackError.current.textContent = "Please fill all the fields.";
      return inputs.forEach((input) => {
        const { value } = input.current;
        if (value) return (input.current.style.borderColor = "chartreuse");
        input.current.style.borderColor = "red";
      });
    }

    setAuthenticated(true);
  }

  function handleRegisterButtonClick() {
    redirectFunction("/");
  }

  return (
    <Fragment>
      <Title>d0ne</Title>
      <h2>Create account</h2>
      <p>
        <span style={{ color: "red" }} ref={callbackError} />
      </p>
      <input
        name="nickname"
        ref={nicknameInput}
        type="text"
        placeholder="Your nickname..."
      />
      <input
        name="email"
        ref={emailInput}
        type="email"
        placeholder="Your email address..."
      />
      <input
        name="password"
        ref={passwordInput}
        type="password"
        placeholder="Your password..."
      />
      <Button onClick={handleLoginButtonClick}>Sign up</Button>
      <h3 style={{ marginTop: "5vh" }}>Already have an account?</h3>
      <Button
        onClick={handleRegisterButtonClick}
        backgroundColor="var(--defaultblue)"
      >
        Log in
      </Button>
    </Fragment>
  );
};

export default Register;
