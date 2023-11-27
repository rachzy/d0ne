import React, { Fragment, MutableRefObject, useRef, useContext } from "react";

import Button from "../../components/Button";
import { IPage } from "../../interfaces/Page.interface";
import Title from "../../components/Title";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";

interface IInputValues {
  email: string;
  password: string;
}

const Index: React.FC<IPage> = ({ setAuthenticated }) => {
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;
  
  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;
  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;
  const inputs = [emailInput, passwordInput];

  async function handleLoginButtonClick() {
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
      return inputs.forEach(
        (input) => (input.current.style.borderColor = "red")
      );
    }

    setAuthenticated(true);
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
      />
      <input
        name="password"
        ref={passwordInput}
        type="password"
        placeholder="Your password..."
      />
      <Button onClick={handleLoginButtonClick}>Login</Button>
      <h3 style={{ marginTop: "5vh" }}>New here?</h3>
      <Button onClick={handleRegisterButtonClick} backgroundColor="var(--defaultblue)">
        Create account
      </Button>
    </Fragment>
  );
};

export default Index;
