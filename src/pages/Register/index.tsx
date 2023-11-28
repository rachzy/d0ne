import { Fragment, MutableRefObject, useRef, useContext } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { IWindowContext, WindowContext } from "../../contexts/WindowContext";
import { AuthContext, IAuthContext } from "../../contexts/AuthContext";

interface IInputValues {
  nickname: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register } = useContext(AuthContext) as IAuthContext;
  const { redirectFunction } = useContext(WindowContext) as IWindowContext;

  const callbackError = useRef() as MutableRefObject<HTMLParagraphElement>;
  const [nicknameInput, emailInput, passwordInput, confirmPasswordInput] = [
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLInputElement>,
    useRef() as MutableRefObject<HTMLInputElement>,
  ];
  const inputs = [
    nicknameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ];

  async function handleRegisterButtonClick() {
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

    const { email, nickname, password } = inputValues as IInputValues;
    if (!email || !nickname || !password) {
      callbackError.current.textContent = "Please fill all the fields.";
      return inputs.forEach((input) => {
        const { value } = input.current;
        if (value) return (input.current.style.borderColor = "chartreuse");
        input.current.style.borderColor = "red";
      });
    }

    let canContinue = true;

    // Check inputs values length
    inputs.forEach((input) => {
      if(!canContinue) return;
      const { name, value, minLength } = input.current;
      if (value.length >= minLength) return;

      canContinue = false;
      callbackError.current.textContent = `The field ${name} must be at least ${minLength} characters long.`;
      input.current.style.borderColor = "red";
    });

    // Checks email input
    if(!emailInput.current.value.includes('@') || !emailInput.current.value.includes('.')) {
      callbackError.current.textContent = "You need to insert a valid email.";
      confirmPasswordInput.current.style.borderColor = "red";
      canContinue = false;
    }

    // Checks password matching
    if (passwordInput.current.value !== confirmPasswordInput.current.value) {
      callbackError.current.textContent = "The passwords don't match.";
      confirmPasswordInput.current.style.borderColor = "red";
      canContinue = false;
    }

    if (!canContinue) return;

    const { message, successful } = await register({
      email,
      nickname,
      password,
    });
    if (successful) return;

    callbackError.current.textContent = message;
    inputs.forEach((input) => {
      input.current.style.borderColor = "red";
    });
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const {key} = e;

    if(key.toUpperCase() !== "ENTER") return;
    handleRegisterButtonClick();
  }

  function handleLoginButtonClick() {
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
        minLength={4}
        maxLength={16}
      />
      <input
        name="email"
        ref={emailInput}
        type="email"
        placeholder="Your email address..."
        minLength={8}
        maxLength={128}
      />
      <input
        name="password"
        ref={passwordInput}
        type="password"
        placeholder="Your password..."
        minLength={4}
        maxLength={128}
      />
      <input
        name="confirmPassword"
        ref={confirmPasswordInput}
        type="password"
        placeholder="Confirm your password..."
        minLength={4}
        maxLength={128}
        onKeyDown={handleInputKeyDown}
      />
      <Button onClick={handleRegisterButtonClick}>Sign up</Button>
      <h3 style={{ marginTop: "5vh" }}>Already have an account?</h3>
      <Button
        onClick={handleLoginButtonClick}
        backgroundColor="var(--defaultblue)"
      >
        Log in
      </Button>
    </Fragment>
  );
};

export default Register;
