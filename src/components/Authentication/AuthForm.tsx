import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../../store/user/userSlice";
import { FormErrors, FormValues } from "../../types/formValues";
import { validateForm } from "../../utils/validateForm";
import { InputField } from "../common/Inputfield";

import { loginUser, registerUser } from "./firebaseAuth";

import * as styles from "./Authentication.module.scss";

export const AuthForm: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
  };

  const [validMsg, setValidMsg] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formValues: FormValues = {
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
    };

    const gotErrors = validateForm(formValues, isLoggedIn);
    setFieldErrors(gotErrors);

    if (Object.values(gotErrors).some((error) => error)) {
      return;
    }

    const { name, email, password } = formValues;

    if (!isLoggedIn) {
      registerUser(email, password, name)
        .then((user) => {
          const userDetails = { uid: user.uid, email: user.email, displayName: user.displayName };
          dispatch(setUser(userDetails));
        })
        .catch((error) => setValidMsg(error.message));
    } else {
      loginUser(email, password)
        .then(() => {})
        .catch((error) => {
          const errorMessage = error.message;
          setValidMsg(errorMessage);
        });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h4 className={styles.heading}>{isLoggedIn ? "Sign In" : "Sign Up"}</h4>

      {!isLoggedIn && <InputField ref={nameRef} type="text" placeholder="Your Name" error={fieldErrors.name} />}
      <InputField ref={emailRef} type="text" defaultValue="test-123@gmail.com" placeholder="Email Address" error={fieldErrors.email} />
      <InputField ref={passwordRef} type="password" defaultValue="Gemflix@123" placeholder="Password" error={fieldErrors.password} />

      {validMsg && <p className={styles.validMessage}>{validMsg}</p>}

      <button type="submit" className={styles.button}>
        {isLoggedIn ? "Sign In" : "Sign Up"}
      </button>

      <p className={styles.loginText} onClick={toggleLogin}>
        {isLoggedIn ? "New to Netflix? Sign up now." : "Already Registered? Sign In Here...."}
      </p>
    </form>
  );
};
