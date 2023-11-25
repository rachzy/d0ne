import React, { Fragment, MutableRefObject, useRef, useEffect } from "react";

import Button from "../../Components/Button";
import { IPage } from "../../interfaces/Page.interface";
import Title from "../../Components/Title";

interface IProps extends IPage {
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IInputValues {
  email: string;
  password: string;
}

const Index: React.FC<IProps> = ({
  authenticated,
  setAuthenticated,
  redirectFunction,
}) => {
  useEffect(() => {
    if (!authenticated) return;
    redirectFunction("/tasks");
  }, [authenticated, redirectFunction]);

  const emailInput = useRef() as MutableRefObject<HTMLInputElement>;
  const passwordInput = useRef() as MutableRefObject<HTMLInputElement>;
  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;
  const inputs = [emailInput, passwordInput];

  function handleButtonClick() {
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
        placeholder="Your email address.."
      />
      <input
        name="password"
        ref={passwordInput}
        type="password"
        placeholder="Your password..."
      />
      <Button onClick={handleButtonClick}>Login</Button>
      <h3 style={{ marginTop: "5vh" }}>New here?</h3>
      <Button backgroundColor="aqua">Create account</Button>
    </Fragment>
  );
};

export default Index;
