import React, { Fragment, MutableRefObject, useRef, useContext } from "react";

import Button from "../../components/Button";
import Title from "../../components/Title";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

interface IInputValues {
  email: string;
  password: string;
}

const Index = () => {
  const { login } = useContext(AuthContext) as IAuthContext;
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;

  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;
  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;
  const inputs = [emailInput, passwordInput];

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { key } = e;
    if (key.toUpperCase() !== "ENTER") return;

    handleLoginButtonClick();
  }

  async function handleLoginButtonClick() {
    callbackError.current.textContent = "";
    inputs.forEach((input) => {
      input.current.style.borderColor = "chartreuse";
    });

    let inputValues: IInputValues | object = {};
    inputs.forEach((input) => {
      const { name, value } = input.current;
      inputValues = {
        ...inputValues,
        [name]: value,
      };
    });

    const { email, password } = inputValues as IInputValues;

    if (!email || !password) {
      callbackError.current.textContent = "Please, fill all the fields.";
      return inputs.forEach((input) => {
        if (input.current.value) return;
        input.current.style.borderColor = "red";
      });
    }

    const loginRequest = await login(email, password);
    const { message, successful } = loginRequest;

    if (successful) return;

    callbackError.current.textContent = message;
    inputs.forEach((input) => {
      input.current.style.borderColor = "red";
    });
  }

  function handleRegisterButtonClick() {
    if (!redirectFunction) return;

    redirectFunction("/register");
  }

  return (
    <Fragment>
      <Title>d0ne</Title>
      <h2>Log in</h2>
      <p>
        <span style={{ color: "red" }} ref={callbackError} />
      </p>
      <input
        name="email"
        ref={emailInput}
        type="email"
        placeholder="Your email address..."
        onKeyDown={handleKeyDown}
      />
      <input
        name="password"
        ref={passwordInput}
        type="password"
        placeholder="Your password..."
        onKeyDown={handleKeyDown}
      />
      <Button onClick={handleLoginButtonClick}>Login</Button>
      <h3 style={{ marginTop: "5vh" }}>New here?</h3>
      <Button
        onClick={handleRegisterButtonClick}
        backgroundColor="var(--defaultblue)"
      >
        Create account
      </Button>
    </Fragment>
  );
};

export default Index;
