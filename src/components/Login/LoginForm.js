import { Button, Typography, Stack } from "@mui/material";
import { TextInput } from "@mantine/core";
import useInput from "../../hooks/use-input";
import Link from "next/link";

const LoginForm = () => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
  );

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!firstNameIsValid && !emailIsValid && !secondNameIsValid) {
      return;
    }
    passwordReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Stack spacing={2}>
        <TextInput
          required
          placeholder="Enter Email"
          label="Email"
          type="email"
          style={{ width: 500 }}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          error={emailHasError}
        />
        <TextInput
          required
          placeholder="Enter Password"
          label="Password"
          type="password"
          style={{ width: 500 }}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordInputBlurHandler}
          error={passwordHasError}
        />
        <div>
          <Link href="/dashboard">
            <Button size="small" variant="contained" disabled={!formIsValid}>
              {" "}
              Login{" "}
            </Button>
          </Link>
        </div>
      </Stack>
    </form>
  );
};

export default LoginForm;
