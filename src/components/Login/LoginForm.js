import { Button, Stack } from "@mui/material";
import { TextInput } from "@mantine/core";
import useInput from "../../hooks/use-input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { signInWithEmailAndPassword } from "@firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../authentication/firebase";

const LoginForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    enteredEmail: "",
    enteredPassword: "",
  });

  const handleClick = () =>{ 
    router.push("/dashboard")
  }
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
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!emailIsValid && !passwordIsValid) {
      return;
    }
    setData({
      enteredEmail: enteredEmail,
      enteredPassword: enteredPassword,
    });

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({ email: "", password: "" });
    } catch (err) {
      console.log(err);
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
        <Stack spacing={2} direction="row">
          <Button type = "submit" size="small" variant="contained" disabled={!formIsValid} onClick = {handleClick}>
            Login
          </Button>

          <Link href="register">
            <Button variant="outlined">Register</Button>
          </Link>
        </Stack>
      </Stack>
    </form>
  );
};

export default LoginForm;
